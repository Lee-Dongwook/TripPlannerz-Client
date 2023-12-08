import { Col, Menu } from 'antd';

const { Item } = Menu;

function SideBar() {
  return (
    <Col span={3} style={{ backgroundColor: 'whitesmoke', padding: '16px' }}>
      <Menu mode='vertical'>
        <Item key='new'>최신 순</Item>
        <Item key='hits'>조회수 순</Item>
        <Item key='favorite'>좋아요 순</Item>
      </Menu>
    </Col>
  );
}

export default SideBar;
