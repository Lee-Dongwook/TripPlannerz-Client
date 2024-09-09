import React from "react";
import KakaoMap from "@/lib/kakao/kakaoMap";
import { type TripPlaceInfo } from "../../types/TripPlaceInfo";

interface MapAndTimelineProps {
  searchPlaceInput: string;
  searchPlace: TripPlaceInfo[];
}

const MapAndTimeline: React.FC<MapAndTimelineProps> = ({
  searchPlaceInput,
  searchPlace,
}) => {
  const timeLineItem = searchPlace.map((item, idx) => ({
    children: item.name,
    description: item.description || "해당 장소에 대한 설명이 없습니다.",
    time: `09:00 AM`,
    key: idx,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* 지도 영역 */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <KakaoMap searchKeyword={searchPlaceInput} />
      </div>

      {/* 타임라인 영역 */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          여행 타임라인
        </h3>
        <div className="relative">
          <div className="absolute top-0 left-6 w-0.5 h-full bg-blue-300"></div>
          {timeLineItem.map((item) => (
            <div key={item.key} className="relative flex mb-10 pl-8">
              {/* 타임라인 내용 */}
              <div className="ml-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.children}
                  </h4>
                  <span className="text-sm text-gray-500">
                    &nbsp; &nbsp;{item.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapAndTimeline;
