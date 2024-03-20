import { useState, useEffect, useRef, type MutableRefObject } from 'react';

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

function KakaoMap({ width = 'calc(20vw)', height = 'calc(40vh)', searchKeyword }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      const container = document.getElementById('map');
      const defaultOptions = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const options = searchKeyword ? { ...defaultOptions } : defaultOptions;
      const map = new window.kakao.maps.Map(container!, options);
      (mapRef as MutableRefObject<any>).current = map;

      if (searchKeyword) {
        searchPlaces(map, searchKeyword);
      }
    };
    // 검색어를 적용하는 함수
    const searchPlaces = (map: any, keyword: string) => {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const searchMarkers: Marker[] = [];

          for (let i = 0; i < data.length; i++) {
            disPlayMarker(map, data[i]);
            searchMarkers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(searchMarkers);
          map.setBounds(bounds);
        }
      });
    };

    // 검색어 입력 시, Marker 표출
    const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    const disPlayMarker = (map: any, place: any) => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>'
        );
        infoWindow.open(map, marker);
      });

      const latitudeList: number[] = [];
      latitudeList.push(place.x, place.y);

      localStorage.setItem('latitude', JSON.stringify(latitudeList));
    };

    // 초기에 GPS를 이용한 렌더링
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          initializeMap(latitude, longitude);
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting geolocation:', error);
          // 기본 위치(서울)로 초기화
          initializeMap(37.552635722509, 126.92436042413);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser');
      // 기본 위치(서울)로 초기화
      initializeMap(37.552635722509, 126.92436042413);
    }
  }, [searchKeyword]);

  return (
    <div className='flex'>
      <div
        id='map'
        ref={mapRef}
        className='rounded-lg border-2 border-sky-500'
        style={{ width: width, height: height }}
      ></div>
      <div className='flex-1'>
        {markers.length > 0 ? (
          <div className='min-h-[400px]'>
            <div className='text-xl font-semibold mb-2'>여행하실 장소들</div>
            {markers.slice(0, 6).map((marker, index) => (
              <div key={index} className='text-base text-gray-800 py-2'>
                {index + 1}. {marker.content}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-base'>검색어를 입력해주세요</div>
        )}
      </div>
    </div>
  );
}

export default KakaoMap;
