import { useInfiniteQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getEntireTripList } from '@/services/getEntireTripList';
import TravelCard from './TravelCard';

function TravelCardList() {
  const token = useSelector((state: any) => state.token.token);

  const { data, isFetching, isError } = useInfiniteQuery(
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

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 justify-center'>
      {travelList.map((item) => (
        <TravelCard key={item.id} item={item} />
      ))}
      {isFetching && (
        <div className='flex justify-center mt-4'>
          <div className='spinner-border text-blue-500'></div>
        </div>
      )}
      {isError && <div className='text-red-600'>오류가 발생하였습니다.</div>}
    </div>
  );
}

export default TravelCardList;
