import { type MutableRefObject, useState, useEffect, useRef } from 'react';
import { Table } from 'antd';

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

interface kakaoMapProps {
  width?: string;
  height?: string;
  searchKeyword: string;
}

function KakaoMap({ width = 'calc(20vw)', height = 'calc(40vh)', searchKeyword }: kakaoMapProps) {
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
    <div style={{ display: 'flex' }}>
      <div
        id='map'
        ref={mapRef}
        style={{
          width: width,
          height: height,
          borderRadius: '10px',
          border: '2px solid skyblue',
        }}
      ></div>
      <div style={{ flex: 1 }}>
        {markers ? (
          <Table
            dataSource={markers.slice(0, 6)}
            columns={[
              {
                title: '여행하실 장소들',
                dataIndex: 'content',
                key: 'content',
                render: (text: string, _, index: number) => (
                  <h6 style={{ margin: '0', fontSize: '20px', color: '#333' }}>
                    {index + 1 + '. ' + text}
                  </h6>
                ),
              },
            ]}
            pagination={false}
            style={{ minHeight: '400px' }}
          />
        ) : (
          '검색어를 입력해주세요'
        )}
      </div>
    </div>
  );
}

export default KakaoMap;
