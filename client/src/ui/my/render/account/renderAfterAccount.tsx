import {Button, Form, Modal, Input } from 'antd';

export const renderAfterAccountPage = (renderAfterAccount) => {
    return (
      <div>
        <h2>정보 수정</h2>
        <hr />
        <br />
        <h4>비밀번호 변경</h4>
        <Form>
          <Form.Item label="새로운 비밀번호" name="Password">
            <Input type="text" onChange={renderAfterAccount.onChange.handleChangePassword} />
          </Form.Item>
          <Form.Item label="비밀번호 확인" name="Password">
            <Input type="text" onChange={renderAfterAccount.onChange.handleConfirmPassword} />
          </Form.Item>
          <Button onClick={renderAfterAccount.onClick}>변경하기</Button>
        </Form>
        <hr />
        <br />
        <table>
          <td>
            <h4>선호태그 변경</h4>
          </td>
          <td>
            {/* <Button onClick={handleNestedModal}>태그 변경</Button>
            {nestedModal && (
              <Modal show={handleNestedModal} onHide={handleCloseNested}>
                <Modal.Header closeButton>
                  <Modal.Title>태그</Modal.Title>
                  <Modal.Body>변경 전 태그는 {ranklist} 입니다. </Modal.Body>
                </Modal.Header>
                <Modal.Body>
                  <SelectPreference />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleCloseNested}
                  >
                    확인
                  </Button>
                </Modal.Footer>
              </Modal>
            )} */}
          </td>
        </table>
      </div>
    );
  };