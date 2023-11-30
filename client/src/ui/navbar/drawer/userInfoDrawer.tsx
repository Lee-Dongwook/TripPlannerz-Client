import {Button, Col, Drawer, Table} from 'antd';
import { UserOutlined } from "@ant-design/icons"
import { Member } from '@/domain/Member';

export const UserInfoDrawer = ({onClick, onClose, visible, info}) => {

    const memberInfo: Member = {
      name: info.name,
      gender: info.gender,
      email: info.email,
      types: info.types
    }

    return(
        <>
         <UserOutlined style={{width: '100px', justifyContent: 'center'}} onClick={onClick} />
          <Drawer title="사용자 정보" onClose={onClose} visible={visible}>
            <Table dataSource={[memberInfo]}>
            <Col title="이름" key="name" />
            <Col title="성별" key="gender" />
            <Col title="이메일" key="email" />
            <Col title="선호도" key="types" />
            </Table>
            <hr />
          <Button style={{ width: '330px', borderColor: 'black'}}>마이페이지</Button>
          <br />
          <br />
          <Button style={{ width: '330px', borderColor: 'black'}}>로그아웃</Button>
          </Drawer>
        </>
    )
}