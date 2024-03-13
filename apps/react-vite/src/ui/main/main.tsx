import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import 'tailwindcss/tailwind.css';

import { getEntireTripList } from '@/application/api/main/getEntireTripList';
import Weather from '@/lib/weather/weather';
import SightImage from '@/lib/image/관광지.png';
import SideBar from '@/ui/sidebar/sidebar';

function MainPage() {
  const token = useSelector((state: any) => state.token.token);
  const navigate = useNavigate();

  const [intersectionTarget, setIntersectionTarget] = useState(null);

  const { data, fetchNextPage, hasNextPage, isFetching, isError } = useInfiniteQuery(
    ['tripList', token],
    ({ pageParam = 0 }) => getEntireTripList(token, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPageParam = lastPage.data.content.length === 0 ? false : allPages.length;
        return nextPageParam;
      },
    }
  );

  const travelList = data?.pages.flatMap((page) => page.data.content) || [];

  const movetoSubPage = (num: number) => {
    navigate(`/search/${num}`);
  };

  const observeTarget = useCallback((node) => {
    setIntersectionTarget(node);
  }, []);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage().catch((error) => {
          console.error(error);
        });
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (intersectionTarget) {
      observer.observe(intersectionTarget);
    }

    return () => {
      if (intersectionTarget) {
        observer.unobserve(intersectionTarget);
      }
    };
  }, [intersectionTarget, observerCallback]);

  return (
    <div className='grid'>
      <SideBar />
      <div className='flex flex-col w-full p-4'>
        {isError && <div className='text-red-600'>오류가 발생하였습니다.</div>}
      </div>
      <div className='card'>
        <img src={SightImage} alt='Sight' className='w-48' />
      </div>
      <div className='grid grid-cols-1 gap-4'>
        {travelList.map((item) => (
          <div key={item.id} className='card'>
            <h3>{item.title}</h3>
            <hr className='my-2' />
            <div>
              <strong>인원 현황: </strong> {item.currentNum} / {item.recruitNum}
            </div>
            <div>
              <progress
                className='w-full h-3 bg-gray-300'
                value={item.currentNum}
                max={item.recruitNum}
              ></progress>
            </div>
            <div>
              <strong>여행 기간:</strong> {item.startingDate} ~ {item.comingDate}
            </div>
            <div className='mt-4'>
              <button
                onClick={() => movetoSubPage(item.id ? item.id : 0)}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
              >
                일정 상세 확인하기
              </button>
            </div>
          </div>
        ))}
      </div>
      {isFetching && (
        <div className='flex justify-center mt-4'>
          <div className='spinner-border text-blue-500'></div>
        </div>
      )}
      <div ref={observeTarget} />
      <Weather />
    </div>
  );
}
export default MainPage;
