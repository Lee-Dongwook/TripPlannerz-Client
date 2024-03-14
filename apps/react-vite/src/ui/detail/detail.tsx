import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Card } from 'antd';

import type { Member } from '@/domain/Member';
import type { Trip } from '@/domain/TripList';
import type { TripPlaceInfo } from '@/domain/TripPlaceInfo';

import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';
import { getDetailTripRoute } from '@/application/api/detail/getDetailTripRoute';

import { TripInfo } from '@/ui/detail/info/tripInfo';
import { CommentList } from '@/ui/detail/comment/comment';

const { Meta } = Card;

function DetailPage() {
  const token = useSelector((state: any) => state.token.token);

  const location = useLocation();
  const arr = location.pathname.split('/');

  const [detailTripInfo, setDetailTripInfo] = useState<Trip>({});
  const [tripContent, setTripContent] = useState<string>('');
  const [, setTripAccompanyMemberList] = useState<Member[]>([]);
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
        startingDate: response.data.startingDate,
        comingDate: response.data.comingDate,
      };

      setDetailTripInfo((prevInfo) => ({
        ...prevInfo,
        ...receivedTripInfo,
      }));

      setTripContent(response.data.content);
      setTripAccompanyMemberList((prevList) => [...prevList, ...response.data.memberList]);

      const additionalResponse = await getDetailTripRoute(token, response.data.uuid);

      setSearchPlaceList(additionalResponse.data);
    }
  };

  useEffect(() => {
    handleGetDetailTripInfo();
  }, []);

  return (
    <div>
      <>
        <Row>
          <Col>
            <Card>
              <Meta
                description={
                  <>
                    <div>
                      <TripInfo
                        token={token}
                        tripInfo={detailTripInfo}
                        content={tripContent}
                        searchPlaceList={searchPlaceList}
                      />
                    </div>
                    {detailTripInfo.uuid && <CommentList tripUUID={detailTripInfo.uuid} />}
                  </>
                }
              ></Meta>
            </Card>
          </Col>
        </Row>
      </>
    </div>
  );
}

export default DetailPage;
