import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { Row, Col, Button, Input } from 'antd';
import { deleteMemberInfo } from '@/application/my/deleteMemberInfo';

function WithdrawPage() {
  const token = useSelector((state: any) => state.token.token);
  const navigate = useNavigate();

  const [withdrawModalState, setWithdrawModalState] = useState<boolean>(false);
  const [withdrawCheckboxState, setWithdrawCheckboxState] = useState<boolean>(false);
  const [userPassword, setUserPassword] = useState<string>('');

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

  const handleDeleteMemberInfo = async () => {
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
          {/* Modal */}
          {withdrawModalState && (
            <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center'>
              <div className='bg-white rounded-lg w-80 p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-bold'>비밀번호 입력</h2>
                  <button
                    onClick={handleCloseWithdrawModal}
                    className='text-gray-600 focus:outline-none'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                </div>
                <p className='text-sm mb-4'>서비스 이용시 사용하였던 비밀번호를 입력해주세요.</p>
                <input
                  type='password'
                  placeholder='비밀번호를 입력해주세요.'
                  value={userPassword}
                  onChange={handleInputPassword}
                  className='w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500'
                />
                <div className='flex justify-end'>
                  <button
                    onClick={handleDeleteMemberInfo}
                    className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none'
                  >
                    탈퇴하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default WithdrawPage;
