import { useNavigate } from "react-router-dom";

interface TravelCardProps {
  item: any;
}

function TravelCard({ item }: TravelCardProps) {
  const navigate = useNavigate();

  const movetoSubPage = (num: number) => {
    navigate(`/search/${num}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
      <div className="p-6">
        <div className="font-semibold text-2xl text-gray-800 mb-3">
          {item.title}
        </div>

        <div className="flex flex-wrap mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-xs font-medium mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs font-medium mb-2">
            #winter
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          인원 현황: {item.currentNum} / {item.recruitNum}
        </div>
        <div className="relative pt-1 mb-4">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300">
            <div
              style={{ width: `${(item.currentNum / item.recruitNum) * 100}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>

        <div className="text-center text-gray-600 mb-4">
          여행 기간: {item.comingDate} ~ {item.startingDate}
        </div>

        <button
          onClick={() => movetoSubPage(item.id ? item.id : 0)}
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors duration-300"
        >
          일정 상세 확인하기
        </button>
      </div>
    </div>
  );
}

export default TravelCard;
