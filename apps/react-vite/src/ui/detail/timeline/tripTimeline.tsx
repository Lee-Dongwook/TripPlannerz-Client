export const TripTimeline = ({ searchPlaceList }) => {
  return (
    <>
      <div className='font-bold text-lg mb-2'>TimeLine</div>
      <hr className='mb-4' />
      <div className='flex flex-col'>
        {searchPlaceList.length > 0 ? (
          searchPlaceList.map((item, index) => (
            <div
              key={index}
              className={`mb-2 p-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
            >
              {item.name}
            </div>
          ))
        ) : (
          <p>타임라인을 만들어주세요.</p>
        )}
      </div>
    </>
  );
};
