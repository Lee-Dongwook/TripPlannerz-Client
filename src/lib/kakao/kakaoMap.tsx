import { useState, useEffect, useRef, type MutableRefObject } from "react";

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

interface KakaoMapProps {
  width?: string;
  height?: string;
  searchKeyword: string;
}

function KakaoMap({
  width = "calc(48vw)",
  height = "calc(70vh)",
  searchKeyword,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    // 지도 초기화
    const initializeMap = (latitude: number, longitude: number) => {
      const container = mapRef.current;
      const mapOptions = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container!, mapOptions);
      mapRef.current = map;
      if (searchKeyword) {
        searchPlaces(map, searchKeyword);
      }
    };

    // 장소 검색
    const searchPlaces = (map: any, keyword: string) => {
      const placesService = new window.kakao.maps.services.Places();
      placesService.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const searchMarkers: Marker[] = data.map((place: any) => {
            const marker = createMarker(map, place);
            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            return {
              position: { lat: place.y, lng: place.x },
              content: place.place_name,
            };
          });
          setMarkers(searchMarkers);
          map.setBounds(bounds);
        }
      });
    };

    // 마커 생성 및 표시
    const createMarker = (map: any, place: any) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
      });
      window.kakao.maps.event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });
      return marker;
    };

    // GPS 위치로 지도 초기화
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          initializeMap(33.4996213, 126.5311884);
        },
        () => {
          // 기본 위치로 서울 설정
          initializeMap(37.552635722509, 126.92436042413);
        }
      );
    } else {
      // 기본 위치로 서울 설정
      initializeMap(37.552635722509, 126.92436042413);
    }
  }, [searchKeyword]);

  return (
    <div className="flex items-center">
      <div
        id="map"
        ref={mapRef}
        className="rounded-lg border-2 border-sky-500"
        style={{ width: width, height: height }}
      ></div>
      {markers.length > 0 && (
        <div className="bg-gray-100 w-1/3 p-2">
          <div className="text-xl font-semibold mb-2">여행하실 장소들</div>
          <ul>
            {markers.slice(0, 6).map((marker, index) => (
              <li key={index} className="text-base text-gray-800 py-2">
                {marker.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KakaoMap;
