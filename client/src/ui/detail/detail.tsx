import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Input, Button } from 'antd';

import type { Member } from '@/domain/Member';
import type { Trip } from '@/domain/TripList';
import type { Comment } from '@/domain/Comment';
import type { TripPlaceInfo } from '@/domain/TripPlaceInfo';

import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { postTripLocationToServer } from '@/application/api/detail/postTripLocationToServer';

import KakaoMap from '@/lib/kakao/kakaoMap';

import { CommentList } from '@/ui/detail/comment/comment';
import { RequestAccompany } from '@/ui/detail/accompany/accompany';
import { OptimizeRoute } from '@/ui/detail/optimize/optimizeRoute';
import { TripInfo } from '@/ui/detail/info/tripInfo';
import { TripTimeline } from '@/ui/detail/timeline/tripTimeline';

const { Meta } = Card;

function DetailPage() {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();
  const arr = location.pathname.split('/');

  const [detailTripInfo, setDetailTripInfo] = useState<Trip>({});
  const [tripContent, setTripContent] = useState<string>('');
  const [tripAccompanyMemberList, setTripAccompanyMemberList] = useState<
    Member[]
  >([]);
  const [tripCommentList, setTripCommentList] = useState<Comment[]>([]);
  const [searchPlace, setSearchPlace] = useState<string>('');
  const [searchPlaceList, setSearchPlaceList] = useState<TripPlaceInfo[]>([]);

  const handleGetDetailTripInfo = async () => {
    const response = await getDetailTripInfo(token, arr);

    if (response.data) {
      const receivedTripInfo: Record<
        Exclude<
          keyof Trip,
          | 'image'
          | 'capacity'
          | 'closeRecruitDate'
          | 'recruitNum'
          | 'currentNum'
          | 'area'
          | 'sigungu'
        >,
        any
      > = {
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

      setTripContent(response.data.content);
      setTripAccompanyMemberList((prevList) => [
        ...prevList,
        ...response.data.memberList,
      ]);

      setTripCommentList((prevList) => [
        ...prevList,
        ...response.data.commentList,
      ]);
    }
  };

  const handleInputSearchPlace = (event) => {
    setSearchPlace(event.target.value);
  };

  const handleSaveLocationToServer = async () => {
    const latitude: string = localStorage.getItem('latitude') || '';

    if (detailTripInfo.uuid) {
      const postToServer: TripPlaceInfo = {
        name: searchPlace,
        x: latitude.split(',')[0],
        y: latitude.split(',')[1],
        tripUUID: detailTripInfo.uuid,
      };

      const response = await postTripLocationToServer(token, postToServer);

      if (response) {
        setSearchPlace('');
      }
    }
  };

  useEffect(() => {
    handleGetDetailTripInfo();
  }, []);

  return (
    <div>
      <Card>
        <Meta
          description={
            <>
              <KakaoMap
                width='400px'
                height='400px'
                searchKeyword={searchPlace}
              />
              <br />
              <div style={{ display: 'flex' }}>
                <TripInfo tripInfo={detailTripInfo} content={tripContent} />
                <div style={{ flex: 1 }}>
                  <Input
                    style={{ width: '30%' }}
                    placeholder='여행장소를 입력하세요'
                    onChange={handleInputSearchPlace}
                  />
                  <Button onClick={handleSaveLocationToServer}>입력</Button>
                </div>
              </div>
              {detailTripInfo.uuid && (
                <CommentList
                  tripUUID={detailTripInfo.uuid}
                  commentList={tripCommentList}
                />
              )}
            </>
          }
        ></Meta>
      </Card>
    </div>
  );
}

export default DetailPage;
