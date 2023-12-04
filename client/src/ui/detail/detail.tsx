import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

import { Trip } from '@/domain/TripList';
import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { getDetailTripRoute } from '@/application/api/detail/getDetailTripRoute';
import { getMemberTripInfo } from '@/application/api/detail/getMemberTripInfo';
import { postTripLocationToServer } from '@/application/api/detail/postTripLocationToServer';
import { postStartLocationToServer } from '@/application/api/detail/postStartLocationToServer';

import { CommentList } from '@/ui/detail/comment/comment';
import { RequestAccompany } from '@/ui/detail/accompany/accompany';
import { SearchMap } from '@/ui/detail/search/searchMap';
import { OptimizeRoute } from '@/ui/detail/optimize/optimizeRoute';
import { TripInfo } from '@/ui/detail/info/tripInfo';
import { TripTimeline } from '@/ui/detail/timeline/tripTimeline';

const { Meta } = Card;

function DetailPage() {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();
  const arr = location.pathname.split('/');

  const [detailTripInfo, setDetailTripInfo] = useState<Trip>({});
  const [memberNum, setMemberNum] = useState<number>(0);
  const [memberList, setMemberList] = useState<string[]>([]);
  const [searchPlace, setSearchPlace] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [searchPlaceForOptimize, setSearchPlaceForOptimize] = useState([]);
  const [searchPlaceInput, setSearchPlaceInput] = useState('');
  const [optimizeModal, setOptimizeModal] = useState(false);
  const [startLocation, setStartLocation] = useState('');

  const handleGetDetailTripInfo = async () => {
    const response = await getDetailTripInfo(token, arr);

    if (response.data) {
      const receivedTripInfo: Record<keyof Trip, any> = {
        id: response.data.id,
        uuid: response.data.uuid,
        title: response.data.title,
        content: response.data.content,
        goingDate: response.data.startingDate,
        comingDate: response.data.comingDate,
      };

      setDetailTripInfo((prevInfo) => ({
        ...prevInfo,
        ...receivedTripInfo,
      }));

      setMemberNum(response.data.memberNum);
      setMemberList(response.data.memberList);
      setComments(response.data.commentList);
    }
  };

  const handleGetMemberTripInfo = async () => {
    const response = await getMemberTripInfo(token);

    if (response.data) {
      setUserName(response.data.name);
    }
  };

  const handleGetDetailTripRoute = async () => {
    if (detailTripInfo.uuid) {
      const response = await getDetailTripRoute(token, detailTripInfo.uuid);

      if (response.data) {
        setSearchPlace(response.data);
      }
    }
  };

  useEffect(() => {
    handleGetDetailTripInfo();
    handleGetMemberTripInfo();
    handleGetDetailTripRoute();
  }, [detailTripInfo.uuid]);

  const handleOpenModal = () => {
    setRequestAccompanyModal(true);
  };

  const handleCloseModal = () => {
    setRequestAccompanyModal(false);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSearchInput = (event) => {
    setSearchPlaceInput(event.target.value);
  };

  const handleUpdateSearchInput = async () => {
    const latitude = localStorage.getItem('latitude');

    const postToServer = {
      name: searchPlaceInput,
      x: latitude.split(',')[0],
      y: latitude.split(',')[1],
      tripUUID: tripUuid,
    };

    if (searchPlaceInput) {
      const response = await postTripLocationToServer(token, postToServer);
      //   setSearchPlace([...searchPlace, {
      //     name: searchPlaceInput,
      //     x: latitude.split(',')[0],
      //     y: latitude.split(',')[1],
      //     tripUUID: tripUuid
      //   }])
    }
    setSearchPlaceInput('');
  };

  const timeLineItem =
    searchPlace.length > 0
      ? searchPlace.map((item) => ({
          children: item.name,
        }))
      : null;

  const handleChangeTimeLineItem = async () => {
    const originalOrder = [...searchPlace];
    if (originalOrder.length < 2) {
      alert('2개 이상의 경로를 입력해주세요');
      window.location.href = `/search/${arr[2]}`;
    }

    setSearchPlaceForOptimize(originalOrder);
    setOptimizeModal(true);
  };

  const handleCloseOptimizeModal = () => {
    setOptimizeModal(false);
  };

  const handleSaveStartLocation = (event) => {
    setStartLocation(event.target.value);
  };

  const sendStartLocationToServer = async () => {
    const postToServer = {
      name: startLocation,
      tripUUID: tripUuid,
    };

    const response = await postStartLocationToServer(token, postToServer);

    // await axios.post('http://localhost:8080/api/optimizeRoute',postToServer, {
    //   headers: {'Authorization': `Bearer ${token}`}
    // }).then((res) => {
    //   const totalDuration = res.data.totalDuration;
    //   console.log(totalDuration)
    //   if(totalDuration){
    //     alert(`총 예상 이동 시간은 ${totalDuration}분 입니다.`);
    //     setOptimizeModal(false);
    //   }
    // })
  };

  return (
    <div>
      <Card>
        <Meta
          description={
            <div>
              <TripInfo />
              <TripTimeline />
              <table>
                <td>
                  <OptimizeRoute />
                </td>
                <td style={{ padding: '75px' }}>
                  <RequestAccompany />
                </td>
              </table>
              <SearchMap />
              <CommentList />
            </div>
          }
        ></Meta>
      </Card>
    </div>
  );
}

export default DetailPage;
