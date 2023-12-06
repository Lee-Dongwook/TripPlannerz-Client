import { Card } from 'antd';
import { TripInfoProp } from '@/ui/detail/info/tripInfoProp.types';

const { Meta } = Card;

export const TripInfo = ({ tripInfo, content }: TripInfoProp) => {
  const { title, goingDate, comingDate } = tripInfo;

  return (
    <Card
      style={{
        width: 'calc(30vw)',
        height: 'calc(25vh)',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Meta
          title={title}
          description={
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
          }
          style={{ marginBottom: '10px' }}
        />
        <hr />
        <div style={{ display: 'flex' }}>
          <span>
            <strong>내용:</strong>
          </span>
          <span>{content ? content : '예시 여행입니다.'}</span>
        </div>
      </div>
    </Card>
  );
};
