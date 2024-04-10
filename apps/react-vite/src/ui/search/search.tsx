import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { Trip } from '@/types/TripList';
// import type { Comment } from '@/domain/Comment';

import { getPaginatedTripList } from '@/services/getPaginatedTripList';
import { getDetailTripRoute } from '@/services/getDetailTripRoute';
import { postStartLocationToServer } from '@/services/postStartLocationToServer';
import { postCommentToServer } from '@/services/postCommentToServer';
// import { postRequestAccompanyToServer } from '@/application/api/detail/postRequestAccompanyToServer';

function SearchPage() {
  const location = useLocation();
  const token = useSelector((state: any) => state.token.token);
  const searchParams = new URLSearchParams(location.search);
  const searchedKeyword = searchParams.get('keyword');

  const [tripList, setTripList] = useState<Trip[]>([]);
  const [sortType] = useState<string>('new');

  const [, setSelectedTrip] = useState<any>(null);
  const [selectedTripUuid, setSelectedTripUuid] = useState<string>('');
  const [selectedTripRoute, setSelectedTripRoute] = useState<any[]>();

  const [startLocation, setStartLocation] = useState<string>();

  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [optimizeModalState, setOptimizeModalState] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [calculateRouteLoading, setCalculateRouteLoading] = useState<boolean>(false);

  const [, setOptimizeTime] = useState<number>(0);

  const [review, setReview] = useState<string>('');
  // const [, setRequestContent] = useState<string>('');

  // const [tripCommentList] = useState<Comment[]>([]);

  const handleOpenDrawer = async (record) => {
    const selectedDetailTrip = tripList.find((trip) => trip.id === record.id);
    if (selectedDetailTrip) {
      if (selectedDetailTrip.uuid) {
        setSelectedTripUuid(selectedDetailTrip.uuid);
        const response = await getDetailTripRoute(token, selectedDetailTrip?.uuid);
        setSelectedTripRoute(response.data);
        setSelectedTrip(record);
        setDrawerState(true);
      }
    }
  };

  const handleCloseDrawer = () => {
    setDrawerState(false);
  };

  const handleOpenOptimizeModal = () => {
    setOptimizeModalState(true);
  };

  // const handleCloseOptimizeModal = () => {
  //   setOptimizeModalState(false);
  // };

  const handleSaveStartLocation = (e) => {
    setStartLocation(e.target.value);
  };

  const handleSendStartLocationToServer = async () => {
    const postToServer = {
      name: startLocation,
      tripUUID: selectedTripUuid,
    };

    setCalculateRouteLoading(true);
    const response = await postStartLocationToServer(token, postToServer);
    if (response) {
      alert('최단 경로 계산이 완료되었습니다.');
      setOptimizeTime(parseInt(response.data.totalDuration));
      setCalculateRouteLoading(false);
      setOptimizeModalState(false);
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleAddComment = async () => {
    const postToServer = {
      review: review,
      tripUUID: selectedTripUuid,
    };

    const response = await postCommentToServer(token, postToServer);

    if (response) {
      alert('댓글이 등록되었습니다.');
    }
  };

  // const handleChangeRequestContent = (e) => {
  //   setRequestContent(e.target.value);
  // };

  // const handleRequestAccompany = async () => {
  //   const postToServer = {
  //     review: requestContent,
  //     tripUUID: selectedTripUuid,
  //   };

  //   const response = await postRequestAccompanyToServer(token, postToServer);
  //   if (response) {
  //     alert('동행 신청이 완료되었습니다.');
  //     setRequestContent('');
  //   }
  // };

  const handleGetPaginatedTripList = async () => {
    if (searchedKeyword) {
      const response = getPaginatedTripList(token, 0, sortType);
      return response;
    } else {
      const response = getPaginatedTripList(token, 0, sortType);
      return response;
    }
  };

  const fetchData = async () => {
    const response = await handleGetPaginatedTripList();
    setTripList(response.data.content);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchedKeyword, sortType]);

  return (
    <div className='p-4'>
      {loading ? (
        <div className='flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <>
          <div className='mb-4'>
            <input
              className='input input-bordered w-full'
              placeholder='Search for trips...'
              value={searchedKeyword || ''}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tripList.map((trip, index) => (
              <div
                key={index}
                className='card bg-white p-4 shadow rounded cursor-pointer'
                onClick={() => handleOpenDrawer(trip)}
              >
                <h3 className='text-lg font-semibold'>{trip.title}</h3>
                <p>Participants: {trip.capacity}</p>
                <p>
                  Date: {trip.startingDate} ~ {trip.comingDate}
                </p>
              </div>
            ))}
          </div>

          {drawerState && (
            <div
              className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
            >
              <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-lg font-semibold'>Trip Details</h2>
                  <button onClick={handleCloseDrawer}>X</button>
                </div>

                <div>
                  <p>
                    <strong>Route:</strong>
                  </p>
                  <ul>
                    {selectedTripRoute!.map((route, idx) => (
                      <li key={idx}>{route.name}</li>
                    ))}
                  </ul>
                </div>

                <button className='btn btn-primary my-2' onClick={handleOpenOptimizeModal}>
                  Optimize Route
                </button>

                {optimizeModalState && (
                  <>
                    <input
                      type='text'
                      placeholder='Enter start location'
                      value={startLocation}
                      onChange={handleSaveStartLocation}
                      className='input input-bordered w-full my-2'
                    />
                    <button
                      className={`btn ${calculateRouteLoading ? 'loading' : ''}`}
                      onClick={handleSendStartLocationToServer}
                    >
                      Calculate Route
                    </button>
                  </>
                )}

                <div className='mt-4'>
                  <textarea
                    rows={4}
                    placeholder='Leave a comment...'
                    className='textarea textarea-bordered w-full'
                    value={review}
                    onChange={handleReviewChange}
                  ></textarea>
                  <button className='btn btn-secondary mt-2' onClick={handleAddComment}>
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;
