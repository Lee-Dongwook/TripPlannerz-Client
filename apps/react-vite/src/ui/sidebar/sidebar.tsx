import { useNavigate } from 'react-router-dom';
import { BarsOutlined, SearchOutlined, UserOutlined, PlusCircleOutlined } from '@ant-design/icons';

function SideBar() {
  const navigate = useNavigate();

  const navigateToSelectMenu = (key) => {
    navigate(`/${key}`);
  };

  return (
    <div className='col-span-4 py-4 px-6 bg-gray-200'>
      <ul className='space-y-2'>
        <li className='flex items-center'>
          <BarsOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('main')}
          >
            메인 페이지
          </button>
        </li>
        <li className='flex items-center'>
          <PlusCircleOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('create')}
          >
            여행 생성
          </button>
        </li>
        <li className='flex items-center'>
          <SearchOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('search')}
          >
            여행 조회
          </button>
        </li>
        <li className='text-sm font-medium text-gray-700 mt-4'>마이 페이지</li>
        <li className='flex items-center ml-4'>
          <UserOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('my/profile')}
          >
            내 정보
          </button>
        </li>
        <li className='flex items-center ml-4'>
          <UserOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('my/account')}
          >
            정보 변경
          </button>
        </li>
        <li className='flex items-center ml-4'>
          <UserOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('my/schedule')}
          >
            내 일정 조회
          </button>
        </li>
        <li className='flex items-center ml-4'>
          <UserOutlined className='mr-2' />
          <button
            className='text-sm font-medium text-gray-700 hover:text-blue-500'
            onClick={() => navigateToSelectMenu('my/withdraw')}
          >
            회원 탈퇴
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
