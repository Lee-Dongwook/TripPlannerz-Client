import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import type { LoginModalProps } from '@/ui/start/modal/type/loginModal.types';

export const LoginModal = ({ onSubmit, onChange }: LoginModalProps) => {
  const [toggleLoginModal, setToggleLoginModal] = useState<boolean>(false);

  const openLoginModal = () => {
    setToggleLoginModal(true);
  };

  const closeLoginModal = () => {
    setToggleLoginModal(false);
  };

  return (
    <div>
      <button
        onClick={openLoginModal}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        로그인
      </button>
      {toggleLoginModal && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                      Login
                    </h3>
                    <div className='mt-2'>
                      <form onSubmit={onSubmit}>
                        <input
                          type='email'
                          placeholder='이메일을 입력해주세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handleEmailChange}
                        />
                        <input
                          type='password'
                          placeholder='비밀번호를 입력해주세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handlePasswordChange}
                        />
                        <div className='flex justify-between'>
                          <button
                            type='button'
                            onClick={closeLoginModal}
                            className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded'
                          >
                            닫기
                          </button>
                          <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                          >
                            접속하기
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
