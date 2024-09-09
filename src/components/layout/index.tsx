import React from "react";
import jeju from "@/assets/image/jeju.png";
import kyeongbok from "@/assets/image/kyeongbok.png";
import seolak from "@/assets/image/seolak.png";
import haewoondae from "@/assets/image/haewoondae.png";

interface TravelPlan {
  id: number;
  title: string;
  image: string;
  directions: string;
}

const Layout = ({ children }) => {
  // 여행지 데이터
  const travelPlans: TravelPlan[] = [
    {
      id: 1,
      title: "제주도",
      image: jeju,
      directions: "제주공항에서 차로 30분",
    },
    {
      id: 2,
      title: "경복궁",
      image: kyeongbok,
      directions: "지하철 3호선 경복궁역 5번 출구에서 도보 5분",
    },
    {
      id: 3,
      title: "설악산 국립공원",
      image: seolak,
      directions: "서울에서 고속버스로 2시간 30분",
    },
    {
      id: 4,
      title: "부산 해운대 해수욕장",
      image: haewoondae,
      directions: "부산역에서 지하철로 30분",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="py-10">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Main Content */}
          <main className="col-span-1 p-5">
            {/* 여행지 카드들을 순차적으로 렌더링 */}
            {travelPlans.map((plan) => (
              <div key={plan.id} className="bg-white p-5 rounded shadow-lg">
                <h4 className="text-2xl font-bold mb-3">{plan.title}</h4>
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-64 object-cover rounded mb-3"
                />
              </div>
            ))}
          </main>
          <section className="col-span-3 p-5 bg-gray-50">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default Layout;
