import { Timeline } from 'antd';
import type { TripTimeLineProp } from '@/ui/detail/timeline/tripTimelineProp.types';

export const TripTimeline = ({ searchPlaceList }: TripTimeLineProp) => {
  const timeLineItem =
    searchPlaceList.length > 0
      ? searchPlaceList.map((item) => ({
          children: item.name,
        }))
      : null;

  return (
    <>
      <h4 style={{ textAlign: 'center' }}>
        <strong>TimeLine</strong>
      </h4>
      <hr />
      <Timeline mode='alternate'>
        {timeLineItem &&
          timeLineItem.map((item, index) => (
            <Timeline.Item key={index}>{item.children}</Timeline.Item>
          ))}
      </Timeline>
    </>
  );
};
