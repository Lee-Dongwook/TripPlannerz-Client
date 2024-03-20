import { useState } from 'react';
import type { TripPlaceInfo } from '@/domain/TripPlaceInfo';
import { postTripLocationToServer } from '@/application/api/detail/postTripLocationToServer';
import type { TripInfoProp } from '@/ui/detail/info/tripInfoProp.types';
import { TripTimeline } from '@/ui/detail/timeline/tripTimeline';
import { Kakao } from '@tripplannerz/kakao';

export const TripInfo = ({ token, tripInfo, content, searchPlaceList }: TripInfoProp) => {
  const { uuid, title, startingDate, comingDate } = tripInfo;

  const [searchKeyword, setSearchKeyword] = useState('');

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
    <div className='bg-white shadow rounded overflow-hidden p-4'>
      <h1 className='text-2xl font-bold mb-2'>{title}</h1>
      <p>
        <strong>여행 기간:</strong>{' '}
        {startingDate && comingDate ? `${startingDate} ~ ${comingDate}` : '일정 없음'}
      </p>
      <p>
        <strong>내용:</strong> {content ? content : '예시 여행입니다.'}
      </p>
      <hr className='my-4' />
      {searchPlaceList && <TripTimeline searchPlaceList={searchPlaceList} />}
      <div className='flex space-x-2'>
        <input
          type='text'
          placeholder='여행 장소를 입력하세요'
          value={searchKeyword}
          onChange={handleInputSearchPlace}
          className='input input-bordered flex-1'
        />
        <button className='btn btn-primary' onClick={handleSaveLocationToServer}>
          입력
        </button>
        <Kakao />
      </div>
    </div>
  );
};
