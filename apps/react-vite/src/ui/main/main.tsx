import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';
import 'tailwindcss/tailwind.css';

import { getEntireTripList } from '@/application/api/main/getEntireTripList';
import Weather from '@/lib/weather/weather';

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
    <div>
      <div className='flex justify-between items-center p-4'>
        <img src='https://source.unsplash.com/random/1600x900' alt='Sight' className='w-3/5' />
        <Weather />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center'>
        {travelList.map((item) => (
          <div key={item.id} className='max-w-1/3 rounded overflow-hidden shadow-lg'>
            <img
              className='w-full'
              src='https://source.unsplash.com/random/1600x900'
              alt='Sight'
            ></img>
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{item.title}</div>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                #photography
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                #travel
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
                #winter
              </span>
            </div>
            <div className='text-gray-700 text-base mt-2'>
              인원 현황: {item.currentNum} / {item.recruitNum}
            </div>
            <progress
              className='w-full h-3 bg-gray-300 mt-1'
              value={item.currentNum}
              max={item.recruitNum}
            ></progress>
            <div className='text-gray-700 text-base mt-2'>
              여행 기간: {item.startingDate} ~ {item.comingDate}
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
        {isFetching && (
          <div className='flex justify-center mt-4'>
            <div className='spinner-border text-blue-500'></div>
          </div>
        )}
        {isError && <div className='text-red-600'>오류가 발생하였습니다.</div>}
        <div ref={observeTarget} />
      </div>
    </div>
  );
}
export default MainPage;
