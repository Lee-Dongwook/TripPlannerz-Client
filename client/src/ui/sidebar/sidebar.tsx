import { Col, Menu, type MenuProps } from 'antd';
import { BarsOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
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
    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //   getItem(
    //     'Item 1',
    //     'g1',
    //     null,
    //     [getItem('Option 1', '1'), getItem('Option 2', '2')],
    //     'group'
    //   ),
    //   getItem(
    //     'Item 2',
    //     'g2',
    //     null,
    //     [getItem('Option 3', '3'), getItem('Option 4', '4')],
    //     'group'
    //   ),
    // ]),

    // getItem('Navigation Two', 'sub2', <BarsOutlined />, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Submenu', 'sub3', null, [
    //     getItem('Option 7', '7'),
    //     getItem('Option 8', '8'),
    //   ]),
    // ]),

    getItem(
      'Menu',
      'grp',
      null,
      [
        getItem('메인 페이지', 'main', <BarsOutlined />),
        getItem('여행 조회', 'search', <SearchOutlined />),
        getItem('마이 페이지', 'my', <UserOutlined />),
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
