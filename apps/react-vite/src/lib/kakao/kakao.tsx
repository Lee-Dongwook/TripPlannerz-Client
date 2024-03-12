import { type MutableRefObject, useEffect, useRef } from 'react';

function Kakao({ width = 'calc(15vw)', height = '200px' }) {
  const mapRef = useRef<HTMLElement | null>(null);

  const initializeMap = (latitude, longitude) => {
    const container = document.getElementById('map');
    const defaultOptions = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container as HTMLElement, defaultOptions);
    (mapRef as MutableRefObject<any>).current = map;
  };

  useEffect(() => {
    // 초기에 GPS를 이용한 렌더링
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          initializeMap(latitude, longitude);
        },
        (error) => {
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
  }, []);

  return (
    <div>
      <div
        id='map'
        style={{
          width: width,
          height: height,
          borderRadius: '10px',
          border: '2px solid skyblue',
        }}
      ></div>
    </div>
  );
}

export default Kakao;
