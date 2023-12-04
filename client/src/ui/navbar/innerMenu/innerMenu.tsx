import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { NavbarButton } from '@/ui/navbar/button/navbarButton';
import { CreateTravelDrawer } from '@/ui/navbar/drawer/createTravelDrawer';

export const InnerMenu = () => {
  const navigate = useNavigate();

  const moveToSearch = () => {
    navigate('/search');
  };

  const moveToBill = () => {
    navigate('/bill');
  };

  return (
    <>
      <Menu.Item>
        <CreateTravelDrawer />
      </Menu.Item>
      <Menu.Item>
        <NavbarButton
          name='일정조회'
          style={{ width: '100px' }}
          onClick={moveToSearch}
        />
      </Menu.Item>
      <Menu.Item>
        <NavbarButton
          name='여행경비'
          style={{ width: '100px' }}
          onClick={moveToBill}
        />
      </Menu.Item>
    </>
  );
};
