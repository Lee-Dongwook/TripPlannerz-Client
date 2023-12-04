import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from 'antd';

import { Member } from '@/domain/Member';
import { Trip } from '@/domain/TripList';
import { getDetailTripInfo } from '@/application/api/detail/getDetailTripInfo';

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
  const [tripContent, setTripContent] = useState<string>('');
  const [tripAccompanyMemberList, setTripAccompanyMemberList] = useState<
    Member[]
  >([]);

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
        response.data.memberList,
      ]);
    }
  };

  useEffect(() => {
    handleGetDetailTripInfo();
  }, [detailTripInfo.uuid]);

  return (
    <div>
      <Card>
        <Meta
          description={
            <div>
              <TripInfo tripInfo={detailTripInfo} content={tripContent} />
              {/* <TripTimeline />
              <table>
                <td>
                  <OptimizeRoute />
                </td>
                <td style={{ padding: '75px' }}>
                  <RequestAccompany />
                </td>
              </table>
              <SearchMap /> */}
              <CommentList />
            </div>
          }
        ></Meta>
      </Card>
    </div>
  );
}

export default DetailPage;
