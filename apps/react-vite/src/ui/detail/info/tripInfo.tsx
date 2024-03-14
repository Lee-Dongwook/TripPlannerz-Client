import { useState } from 'react';
import { Button, Card, Input } from 'antd';

import type { TripPlaceInfo } from '@/domain/TripPlaceInfo';
import { postTripLocationToServer } from '@/application/api/detail/postTripLocationToServer';
import type { TripInfoProp } from '@/ui/detail/info/tripInfoProp.types';
import { TripTimeline } from '@/ui/detail/timeline/tripTimeline';
import { Kakao } from '@tripplannerz/kakao';

const { Meta } = Card;

export const TripInfo = ({ token, tripInfo, content, searchPlaceList }: TripInfoProp) => {
  const { uuid, title, startingDate, comingDate } = tripInfo;

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const handleInputSearchPlace = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSaveLocationToServer = async () => {
    const latitude: string = localStorage.getItem('latitude') || '';

    if (uuid) {
      const postToServer: TripPlaceInfo = {
        name: searchKeyword,
        x: latitude.split(',')[0],
        y: latitude.split(',')[1],
        tripUUID: uuid,
      };

      const response = await postTripLocationToServer(token, postToServer);

      if (response) {
        setSearchKeyword('');
      }
    }
  };

  return (
    <Card>
      <div>
        <Meta
          title={title}
          description={
            <>
              <div>
                <span>
                  <strong>여행 기간:</strong>
                </span>
                <span>
                  {startingDate && comingDate ? `${startingDate} ~ ${comingDate}` : '일정 없음'}
                </span>
              </div>
              <div>
                <span>
                  <strong>내용:</strong>
                </span>
                <span>{content ? content : '예시 여행입니다.'}</span>
              </div>
            </>
          }
        />
        <hr />
        {searchPlaceList && <TripTimeline searchPlaceList={searchPlaceList} />}
        <div>
          <Input placeholder='여행장소를 입력하세요' onChange={handleInputSearchPlace} />
          <Button onClick={handleSaveLocationToServer}>입력</Button>
        </div>
        <Kakao />
      </div>
    </Card>
  );
};
