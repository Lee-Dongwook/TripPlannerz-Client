import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form, Input } from 'antd';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteMemberInfo } from '@/application/my/deleteMemberInfo';
import SideBar from '@/ui/sidebar/sidebar';

function WithdrawPage() {
  const token = useSelector((state: any) => state.token.token);
  const navigate = useNavigate();

  const [withdrawModalState, setWithdrawModalState] = useState<boolean>(false);
  const [withdrawCheckboxState, setWithdrawCheckboxState] = useState<boolean>(false);
  const [userPassword, setUserPassword] = useState<string>();

  const handleOpenWithdrawModal = () => {
    setWithdrawModalState(true);
  };

  const handleCloseWithdrawModal = () => {
    setWithdrawModalState(false);
  };

  const handleToggleWithdrawCheckbox = () => {
    setWithdrawCheckboxState(!withdrawCheckboxState);
  };

  const handleInputPassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleDeleteMemberInfo = async (event) => {
    event.preventDefault();

    try {
      await deleteMemberInfo(token, userPassword);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh)', display: 'flex' }}>
      <Row style={{ width: '100%', height: '100%' }}>
        <SideBar />
        <Col span={15} style={{ padding: '16px' }}>
          <h2>회원 탈퇴 안내</h2>
          <hr />
          <h6>회원탈퇴를 신청하기 전 안내 사항을 확인해주세요.</h6>
          <br />
          <h5>사용하고 계신 아이디()는 탈퇴할 경우 재사용을 하거나 복구가 불가능합니다.</h5>
          <h6>
            탈퇴한 아이디는 본인 및 타인이 더 이상 사용할 수 없는 점을 감안하여 신중하게 선택하시길
            바랍니다.
          </h6>
          <br />
          <h5>탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다.</h5>
          <br />
          <br />
          <table>
            <td>
              <Input type='checkbox' onClick={handleToggleWithdrawCheckbox} />
            </td>
            <td>
              <h6>안내사항을 숙지하였으며, 이에 동의합니다.</h6>
            </td>
          </table>
          <Button onClick={handleOpenWithdrawModal}>탈퇴하기</Button>
          {withdrawModalState && (
            <Modal show={withdrawModalState} onHide={handleCloseWithdrawModal}>
              <Modal.Header closeButton onClick={handleCloseWithdrawModal}>
                <Modal.Title>비밀번호 입력</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>서비스 이용시 사용하였던 비밀번호를 입력해주세요.</h6>
              </Modal.Body>
              <Modal.Body>
                <Form>
                  <Input
                    type='text'
                    placeholder='비밀번호를 입력해주세요.'
                    onChange={handleInputPassword}
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleDeleteMemberInfo}>탈퇴하기</Button>
              </Modal.Footer>
            </Modal>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default WithdrawPage;
