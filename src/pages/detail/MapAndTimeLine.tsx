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
    key: idx,
  }));

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <KakaoMap searchKeyword={searchPlaceInput} />
          </td>
          <td>
            <strong>TimeLine</strong>
            <div className="flex flex-col relative">
              {timeLineItem.map((item) => (
                <div className="flex relative pl-4 key={item.key}">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-1 -left-2.5 absolute"></div>
                  <div className="ml-4">{item.children}</div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MapAndTimeline;
