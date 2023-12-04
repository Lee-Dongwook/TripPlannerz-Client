export const TripTimeline = () => {
  return (
    <>
      <h4>
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
