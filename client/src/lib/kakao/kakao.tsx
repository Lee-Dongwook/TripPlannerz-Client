import { useState, useEffect, useRef } from 'react';

function Kakao({ width = 'calc(15vw)', height = '200px' }) {
  const container = useRef(null);
  const map = useRef(null);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // 검색어를 적용한 Kakao Map 생성
    const initializeMap = (latitude, longitude) => {
      const defaultOptions = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const options = defaultOptions;
      map.current = new kakao.maps.Map(container.current, options);
    };

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
        ref={container}
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
