import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Button, Col, Drawer, Table} from 'antd';
import { UserOutlined } from "@ant-design/icons"


import { Member } from '@/domain/Member';
import { postLogout} from '@/application/api/navbar/postLogout';

export const UserInfoDrawer = ({onClick, onClose, visible, info}) => {

    const token = useSelector((state:any) => state.token.token);
    const navigate = useNavigate();

    const memberInfo: Member = {
      name: info.name,
      gender: info.gender,
      email: info.email,
      types: info.types
    }

    const moveToMyPage = () => {
      navigate('/my');
    }

    const handleLogOut = async() => {
      const response = await postLogout(token);
      
      if(response) {
        alert('로그아웃이 되었습니다.');
        navigate('/');
      }
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
          <Button style={{ width: '330px', borderColor: 'black'}} onClick={moveToMyPage}>마이페이지</Button>
          <br />
          <br />
          <Button style={{ width: '330px', borderColor: 'black'}} onClick={handleLogOut}>로그아웃</Button>
          </Drawer>
        </>
    )
}