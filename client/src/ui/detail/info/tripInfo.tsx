export const TripInfo = () => {
  return (
    <>
      <h3>{title}</h3>
      <h5>
        여행 기간 :{' '}
        {startingDate < comingDate
          ? `${startingDate} ~ ${comingDate}`
          : `${comingDate} ~ ${startingDate}`}
      </h5>
      <h5>내용: {content ? content : '예시 여행입니다.'} </h5>
    </>
  );
};
