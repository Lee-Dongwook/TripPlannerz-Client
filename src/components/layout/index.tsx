import React, { useState } from "react";
import jeju from "@/assets/image/jeju.png";

interface HoveredPlace {
  id: number;
  title: string;
  image: string;
  directions: string;
}

const Layout = ({ children }) => {
  const travelPlans = [
    {
      id: 1,
      title: "제주도",
      image: jeju,
      directions: "제주공항에서 차로 30분",
    },
    {
      id: 2,
      title: "경복궁",
      image: "https://example.com/gyeongbokgung.jpg",
      directions: "지하철 3호선 경복궁역 5번 출구에서 도보 5분",
    },
    {
      id: 3,
      title: "설악산 국립공원",
      image: "https://example.com/seoraksan.jpg",
      directions: "서울에서 고속버스로 2시간 30분",
    },
    {
      id: 4,
      title: "부산 해운대 해수욕장",
      image: "https://example.com/haeundae.jpg",
      directions: "부산역에서 지하철로 30분",
    },
    {
      id: 5,
      title: "전주 한옥마을",
      image: "https://example.com/jeonju.jpg",
      directions: "전주역에서 택시로 15분",
    },
    {
      id: 6,
      title: "남산서울타워",
      image: "https://example.com/namsan.jpg",
      directions: "명동역 3번 출구에서 도보 20분",
    },
    {
      id: 7,
      title: "경주 불국사",
      image: "https://example.com/bulguksa.jpg",
      directions: "경주역에서 버스로 40분",
    },
    {
      id: 8,
      title: "속초 해수욕장",
      image: "https://example.com/sokcho.jpg",
      directions: "서울에서 버스로 2시간 40분",
    },
    {
      id: 9,
      title: "강릉 경포대",
      image: "https://example.com/gyongpodae.jpg",
      directions: "강릉역에서 버스로 15분",
    },
    {
      id: 10,
      title: "안동 하회마을",
      image: "https://example.com/hahoe.jpg",
      directions: "안동역에서 버스로 1시간",
    },
  ];

  // 현재 마우스가 올라간 관광지를 저장하는 상태
  const [hoveredPlace, setHoveredPlace] = useState<HoveredPlace | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg grid grid-cols-1 md:grid-cols-4">
          <aside className="col-span-1 bg-gray-50 p-5 border-r">
            <h3 className="font-bold text-xl mb-5">국내 TOP 관광지</h3>
            <ul className="space-y-4">
              {/* 국내 관광지 데이터를 동적으로 렌더링 */}
              {travelPlans.map((plan) => (
                <li
                  key={plan.id}
                  className="text-blue-500 hover:underline cursor-pointer"
                  onMouseEnter={() => setHoveredPlace(plan)}
                  onMouseLeave={() => setHoveredPlace(null)}
                >
                  {plan.title}
                </li>
              ))}
            </ul>
          </aside>
          <main className="col-span-2 p-5">
            {hoveredPlace ? (
              <div className="bg-white p-5 rounded shadow-lg">
                <h4 className="text-2xl font-bold mb-3">
                  {hoveredPlace.title}
                </h4>
                <img
                  src={hoveredPlace.image}
                  alt={hoveredPlace.title}
                  className="w-full h-full object-cover rounded mb-3"
                />
                <p className="text-gray-700">
                  <strong>가는 방법: </strong>
                  {hoveredPlace.directions}
                </p>
              </div>
            ) : null}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
