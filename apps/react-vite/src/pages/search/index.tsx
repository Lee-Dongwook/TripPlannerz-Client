import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { Trip } from '@/types/TripList';
// import type { Comment } from '@/domain/Comment';

import { getPaginatedTripList } from '@/services/getPaginatedTripList';
import { getDetailTripRoute } from '@/services/getDetailTripRoute';
import { postStartLocationToServer } from '@/services/postStartLocationToServer';
// import { postRequestAccompanyToServer } from '@/application/api/detail/postRequestAccompanyToServer';
import Layout from '@/components/layout';
import TravelCard from './TravelCard';
import TravelDetailDrawer from './TravelDetailDrawer';

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
    <Layout>
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
              <TravelCard key={index} trip={trip} onClick={handleOpenDrawer} />
            ))}
          </div>

          {drawerState && (
            <TravelDetailDrawer
              handleCloseDrawer={handleCloseDrawer}
              selectedTripRoute={selectedTripRoute}
              handleOpenOptimizeModal={handleOpenOptimizeModal}
              optimizeModalState={optimizeModalState}
              startLocation={startLocation}
              handleSaveStartLocation={handleSaveStartLocation}
              calculateRouteLoading={calculateRouteLoading}
              handleSendStartLocationToServer={handleSendStartLocationToServer}
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default SearchPage;
