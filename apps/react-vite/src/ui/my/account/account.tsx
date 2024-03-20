import { useState } from 'react';
import { useSelector } from 'react-redux';

import { postVerifyMemberPassword } from '@/application/api/my/postVerifyMemberPassword';
import { postChangeMemberPassword } from '@/application/api/my/postChangeMemberPassword';

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
    <div className='flex w-full h-screen items-center justify-center'>
      <div className='w-full max-w-xs'>
        {accountState ? (
          <>
            <h2 className='text-2xl font-bold mb-4'>정보 수정</h2>
            <h4 className='text-xl mb-4'>비밀번호 변경</h4>
            <input
              type='password'
              placeholder='새로운 비밀번호를 입력해주세요'
              onChange={handleInputNewPassword}
              className='input input-bordered w-full mb-4'
            />
            <button className='btn btn-primary w-full' onClick={handleSendNewPasswordToServer}>
              변경하기
            </button>
          </>
        ) : (
          <>
            <h4 className='mb-4'>정보 수정을 위해 본인을 인증해주세요.</h4>
            <input
              type='password'
              placeholder='현재 비밀번호를 입력해주세요'
              onChange={handleInputCurrentPassword}
              className='input input-bordered w-full mb-4'
            />
            <button className='btn btn-primary w-full' onClick={handleSendCurrentPasswordToServer}>
              인증하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
