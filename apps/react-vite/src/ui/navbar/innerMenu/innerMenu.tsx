import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NavbarButton } from '@/ui/navbar/button/navbarButton';

export const InnerMenu = () => {
  const navigate = useNavigate();

  const moveToCreate = () => {
    navigate('/create');
  };

  const moveToSearch = () => {
    navigate('/search');
  };

  const moveToBill = () => {
    navigate('/bill');
  };

  return (
    <>
      <Menu.Item>
        <NavbarButton name='여행 생성' style={{ width: '100px' }} onClick={moveToCreate} />
      </Menu.Item>
      <Menu.Item>
        <NavbarButton name='일정 조회' style={{ width: '100px' }} onClick={moveToSearch} />
      </Menu.Item>
      <Menu.Item>
        <NavbarButton name='여행 경비' style={{ width: '100px' }} onClick={moveToBill} />
      </Menu.Item>
    </>
  );
};
