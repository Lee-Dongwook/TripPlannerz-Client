import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Trip } from '@/domain/TripList';
import { getPaginatedTripList } from '@/application/api/my/getPaginatedTripList';

function SchedulePage() {
  const token = useSelector((state: any) => state.token.token);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchedKeyword = searchParams.get('keyword');

  const [tripList, setTripList] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleMoveToCertainTrip = (postId: string) => {
    const url = `/search/${postId}`;
    navigate(url);
  };

  const handleGetPaginatedTripList = async () => {
    const response = getPaginatedTripList(token, 0, 'new');
    return response;
  };

  const fetchData = async () => {
    const response = await handleGetPaginatedTripList();
    setTripList(response.data.content);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchedKeyword]);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {loading ? (
        <div className='flex justify-center items-center'>
          <div
            className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
            role='status'
          >
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='w-full max-w-4xl px-4'>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              className='input input-bordered w-full'
            />
          </div>
          <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>일정 제목</th>
                  <th>마감 날짜</th>
                  <th>인원 수</th>
                  <th>일정 날짜</th>
                </tr>
              </thead>
              <tbody>
                {tripList.map((trip, index) => (
                  <tr
                    key={index}
                    className='cursor-pointer'
                    onClick={() => handleMoveToCertainTrip}
                  >
                    <td>{trip.title}</td>
                    <td>{trip.closeRecruitDate}</td>
                    <td>{trip.capacity}</td>
                    <td>
                      {trip.startingDate} ~ {trip.comingDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SchedulePage;
