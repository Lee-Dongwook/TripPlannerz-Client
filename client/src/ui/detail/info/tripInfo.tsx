import type { TripInfoProp } from '@/ui/detail/info/tripInfoProp.types';

export const TripInfo = ({ tripInfo, content }: TripInfoProp) => {
  const { title, goingDate, comingDate } = tripInfo;

  return (
    <>
      <h3>{title}</h3>
      <h5>
        여행 기간 : {goingDate && comingDate && `${goingDate} ~ ${comingDate}`}
      </h5>
      <h5>내용: {content ? content : '예시 여행입니다.'} </h5>
    </>
  );
};
