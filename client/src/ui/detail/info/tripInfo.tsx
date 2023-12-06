import { useState } from 'react';
import { Button, Card, Input } from 'antd';

import type { TripPlaceInfo } from '@/domain/TripPlaceInfo';
import { postTripLocationToServer } from '@/application/api/detail/postTripLocationToServer';
import KakaoMap from '@/lib/kakao/kakaoMap';
import type { TripInfoProp } from '@/ui/detail/info/tripInfoProp.types';
import { TripTimeline } from '@/ui/detail/timeline/tripTimeline';

const { Meta } = Card;

export const TripInfo = ({ token, tripInfo, content }: TripInfoProp) => {
  const { uuid, title, goingDate, comingDate } = tripInfo;

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [searchPlaceList, setSearchPlaceList] = useState<TripPlaceInfo[]>([]);

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
    <Card
      style={{
        width: '100%',
        height: 'calc(80vh)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Meta
          title={title}
          description={
            <>
              <div style={{ display: 'flex' }}>
                <span>
                  <strong>여행 기간:</strong>
                </span>
                <span>
                  {goingDate && comingDate
                    ? `${goingDate} ~ ${comingDate}`
                    : '일정 없음'}
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <span>
                  <strong>내용:</strong>
                </span>
                <span>{content ? content : '예시 여행입니다.'}</span>
              </div>
            </>
          }
          style={{ marginBottom: '10px' }}
        />
        <hr />
        <TripTimeline searchPlaceList={searchPlaceList} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Input
            style={{ width: '25%', textAlign: 'center' }}
            placeholder='여행장소를 입력하세요'
            onChange={handleInputSearchPlace}
          />
          <Button onClick={handleSaveLocationToServer}>입력</Button>
        </div>
        <KakaoMap searchKeyword={searchKeyword} />
      </div>
    </Card>
  );
};
