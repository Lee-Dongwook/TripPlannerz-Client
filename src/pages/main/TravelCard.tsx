import { useNavigate } from 'react-router-dom';

interface TravelCardProps {
  item: any;
}

function TravelCard({ item }: TravelCardProps) {
  const navigate = useNavigate();

  const movetoSubPage = (num: number) => {
    navigate(`/search/${num}`);
  };

  return (
    <div className='max-w-1/3 rounded overflow-hidden shadow-lg'>
      <img
        className='w-full'
        src='https://source.unsplash.com/random/1600x900'
        alt='Sight'
        loading='lazy'
      ></img>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{item.title}</div>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
          #photography
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
          #travel
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
          #winter
        </span>
      </div>
      <div className='text-gray-700 text-base mt-2'>
        인원 현황: {item.currentNum} / {item.recruitNum}
      </div>
      <progress
        className='w-full h-3 bg-gray-300 mt-1'
        value={item.currentNum}
        max={item.recruitNum}
      ></progress>
      <div className='text-gray-700 text-base mt-2'>
        여행 기간: {item.startingDate} ~ {item.comingDate}
      </div>
      <div className='mt-4'>
        <button
          onClick={() => movetoSubPage(item.id ? item.id : 0)}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          일정 상세 확인하기
        </button>
      </div>
    </div>
  );
}

export default TravelCard;
