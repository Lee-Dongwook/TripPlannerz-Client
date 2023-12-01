import {Button, Form, Modal, Input} from 'antd';
import { RenderWithdrawProp } from '@/ui/my/render/withdraw/renderWithdrawProp.types';

export const renderWithdrawPage = ({email, onClick}: RenderWithdrawProp) => {
    return (
      <div className="profilecard">
        <h2>회원 탈퇴 안내</h2>
        <hr />
        <h6>회원탈퇴를 신청하기 전 안내 사항을 확인해주세요.</h6>
        <br />
        <h5>
          사용하고 계신 아이디({email})는 탈퇴할 경우 재사용을 하거나 복구가
          불가능합니다.
        </h5>
        <h6>
          탈퇴한 아이디는 본인 및 타인이 더 이상 사용할 수 없는 점을 감안하여
          신중하게 선택하시길 바랍니다.
        </h6>
        <br />
        <h5>탈퇴 후 회원정보 및 서비스 이용기록은 모두 삭제됩니다.</h5>
        <br />
        <br />
        <table>
          <td>
            <Input type="checkbox" onClick={onClick.handleToggle} />
          </td>
          <td>
            <h6>안내사항을 숙지하였으며, 이에 동의합니다.</h6>
          </td>
        </table>
        <Button onClick={onClick.handleWithdrawModal}>
          탈퇴하기
        </Button>
        {/* {withdrawModal && (
          <Modal show={handleWithdrawModal} onHide={handleCloseWithdraw}>
            <Modal.Header closeButton onClick={handleCloseButton}>
              <Modal.Title>비밀번호 입력</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>서비스 이용시 사용하였던 비밀번호를 입력해주세요.</h6>
            </Modal.Body>
            <Modal.Body>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="비밀번호를 입력해주세요."
                  onChange={handleWithdrawPassword}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" onClick={handleCloseWithdraw}>
                탈퇴하기
              </Button>
            </Modal.Footer>
          </Modal>
        )} */}
      </div>
    );
  };