import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '@/services/postLogout';
import { setToken } from '@/store/token';

export const UserInfoDrawer = ({ onClick, onClose, visible, info }) => {
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToMyPage = () => {
    navigate('/my/profile');
  };

  const handleLogOut = async () => {
    const response = await postLogout(token);

    if (response) {
      alert('로그아웃이 되었습니다.');
      localStorage.removeItem('persist:root');
      dispatch(setToken(''));
      navigate('/');
    }
  };

  return (
    <>
      <button onClick={onClick} className='text-xl'></button>
      {visible && (
        <div
          className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
          onClick={onClose}
        >
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3 text-center'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>사용자 정보</h3>
              <div className='mt-2 px-7 py-3'>
                <p className='text-sm text-gray-500'>
                  이름: {info.name}
                  <br />
                  성별: {info.gender}
                  <br />
                  이메일: {info.email}
                  <br />
                  선호도: {info.preferences?.join(', ')}
                </p>
              </div>
              <div className='items-center px-4 py-3'>
                <button
                  onClick={moveToMyPage}
                  className='px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
                >
                  마이페이지
                </button>
                <button
                  onClick={handleLogOut}
                  className='mt-3 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300'
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
