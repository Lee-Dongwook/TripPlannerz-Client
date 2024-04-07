import { useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';

const KakaoLogin = () => {
  const query = queryString.parse(window.location.search);

  const getKakaoTokenHandler = async (code) => {
    const data = {
      grant_type: 'authorization_code',
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      code: code,
      client_secret: import.meta.env.VITE_KAKAO_SECRET,
    };

    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    axios
      .post(import.meta.env.VITE_KAKAO_AUTH_URL, queryString, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query.code.toString());
    }
  }, []);

  const handleKakaoLogin = () => {
    const REST_API_KEY: string = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
    const link: string = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = link;
  };

  return (
    <button
      type='button'
      className='w-full block bg-yellow-200 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 mt-6 border border-gray-300'
      onClick={handleKakaoLogin}
    >
      카카오 소셜 로그인
    </button>
  );
};

export default KakaoLogin;
