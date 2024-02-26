import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Member } from '@/domain/Member';
import { postLogout } from '@/application/api/navbar/postLogout';
import { setToken } from '@/store/token';

const { Column } = Table;

export const UserInfoDrawer = ({ onClick, onClose, visible, info }) => {
  const token = useSelector((state: any) => state.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memberInfo: Member = {
    name: info.name,
    gender: info.gender,
    email: info.email,
    types: info.prefereneces,
  };

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
      <UserOutlined
        style={{ width: '100px', justifyContent: 'center' }}
        onClick={onClick}
      />
      <Drawer title='사용자 정보' onClose={onClose} open={visible} width={370}>
        {memberInfo && (
          <Table dataSource={[memberInfo]}>
            <Column title='이름' dataIndex='name' key='name' />
            <Column title='성별' dataIndex='gender' key='gender' />
            <Column title='이메일' dataIndex='email' key='email' />
            <Column title='선호도' dataIndex='types' key='types' />
          </Table>
        )}
        <hr />
        <Button
          style={{ width: '330px', borderColor: 'black' }}
          onClick={moveToMyPage}
        >
          마이페이지
        </Button>
        <br />
        <br />
        <Button
          style={{ width: '330px', borderColor: 'black' }}
          onClick={handleLogOut}
        >
          로그아웃
        </Button>
      </Drawer>
    </>
  );
};
