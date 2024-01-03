import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Form, Input, Button } from 'antd';

import { postVerifyMemberPassword } from '@/application/api/my/postVerifyMemberPassword';
import { postChangeMemberPassword } from '@/application/api/my/postChangeMemberPassword';
import SideBar from '@/ui/sidebar/sidebar';

function AccountPage() {
  const token = useSelector((state: any) => state.token.token);

  const [accountState, setAccountState] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();

  const handleInputCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleInputNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSendCurrentPasswordToServer = async () => {
    const postToServer = {
      pw: currentPassword,
    };

    const response = await postVerifyMemberPassword(token, postToServer);

    if (response.data.result === true) {
      alert('인증 성공했습니다.');
      setAccountState(true);
    } else {
      alert('비밀번호를 다시 입력해주세요.');
    }
  };

  const handleSendNewPasswordToServer = async () => {
    const postToServer = {
      pw: newPassword,
    };

    const response = await postChangeMemberPassword(token, postToServer);

    if (response) {
      alert('비밀번호가 변경되었습니다.');
    }
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh)', display: 'flex' }}>
      <>
        <Row style={{ width: '100%', height: '100%' }}>
          <SideBar />
          <Col span={15} style={{ padding: '16px' }}>
            {accountState ? (
              <div>
                <h2>정보 수정</h2>
                <h4>비밀번호 변경</h4>
                <Form>
                  <Input
                    type='password'
                    placeholder='새로운 비밀번호를 입력해주세요'
                    onChange={handleInputNewPassword}
                  />
                </Form>
                <Button onClick={handleSendNewPasswordToServer}>
                  변경하기
                </Button>
              </div>
            ) : (
              <div>
                <h4>정보 수정을 위해 본인을 인증해주세요.</h4>
                <Form>
                  <Input
                    type='password'
                    placeholder='현재 비밀번호를 입력해주세요'
                    onChange={handleInputCurrentPassword}
                  />
                </Form>
                <Button onClick={handleSendCurrentPasswordToServer}>
                  인증하기
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </>
    </div>
  );
}

export default AccountPage;
