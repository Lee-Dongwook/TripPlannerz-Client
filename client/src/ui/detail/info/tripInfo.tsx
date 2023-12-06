import { Card } from 'antd';
import { TripInfoProp } from '@/ui/detail/info/tripInfoProp.types';

const { Meta } = Card;

const TripInfo = ({ tripInfo, content }: TripInfoProp) => {
  const { title, goingDate, comingDate } = tripInfo;

  return (
    <Card
      style={{
        width: 'calc(30vw)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Meta title={title} style={{ marginBottom: '10px' }} />
      <p>
        <strong>여행 기간: </strong>
        {goingDate && comingDate ? `${goingDate} ~ ${comingDate}` : '일정 없음'}
      </p>
      <p>
        <strong>내용: </strong>
        {content ? content : '예시 여행입니다.'}
      </p>
    </Card>
  );
};

export default TripInfo;
