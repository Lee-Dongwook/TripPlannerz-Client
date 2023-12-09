import { Col, Menu, type MenuProps } from 'antd';
import {
  BarsOutlined,
  SearchOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function SideBar() {
  const navigate = useNavigate();

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };

  const menuItems: MenuProps['items'] = [
    getItem(
      'Menu',
      'grp',
      null,
      [
        getItem('메인 페이지', 'main', <BarsOutlined />),
        getItem('여행 생성', 'create', <PlusCircleOutlined />),
        getItem('여행 조회', 'search', <SearchOutlined />),
        getItem('마이 페이지', 'my', <UserOutlined />, [
          getItem('내 정보', 'my/profile'),
          getItem('정보 변경', 'my/account'),
          getItem('내 일정 조회', 'my/schedule'),
          getItem('회원 탈퇴', 'my/withdraw'),
        ]),
      ],
      'group'
    ),

    { type: 'divider' },
  ];

  const navigateToSelectMenu = (key: string) => {
    navigate(`/${key}`);
  };

  return (
    <Col span={3} style={{ backgroundColor: 'whitesmoke', padding: '16px' }}>
      <Menu
        mode='inline'
        items={menuItems}
        onSelect={({ key }) => navigateToSelectMenu(key)}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Col>
  );
}

export default SideBar;
