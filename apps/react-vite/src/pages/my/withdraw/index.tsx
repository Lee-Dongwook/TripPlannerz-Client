import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { deleteMemberInfo } from '@/application/my/deleteMemberInfo';

function WithdrawPage() {
  const token = useSelector((state: any) => state.token.token);
  const navigate = useNavigate();

  const [withdrawCheckboxState, setWithdrawCheckboxState] = useState<boolean>(false);
  const [userPassword, setUserPassword] = useState<string>('');

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
    <div className='flex w-full h-screen items-center justify-center'>
      <div className='w-full max-w-2xl p-5'>
        <h2 className='text-2xl font-semibold mb-4'>회원 탈퇴 안내</h2>
        <p className='mb-4'>회원 탈퇴를 신청하기 전 안내 사항을 확인해주세요.</p>
        <div className='mb-4'>
          <input
            type='checkbox'
            className='checked:bg-blue-500 checked:border-transparent'
            onChange={handleToggleWithdrawCheckbox}
          />
          <label className='ml-2'>안내사항을 숙지하였으며, 이에 동의합니다.</label>
        </div>
        {withdrawCheckboxState && (
          <div className='flex flex-col space-y-4'>
            <input
              type='password'
              className='input input-bordered w-full'
              placeholder='비밀번호를 입력해주세요.'
              value={userPassword}
              onChange={handleInputPassword}
            />
            <button className='btn btn-error' onClick={handleDeleteMemberInfo}>
              탈퇴하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WithdrawPage;
