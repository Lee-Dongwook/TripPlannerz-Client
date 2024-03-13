import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { SignUpModalProps } from '@/ui/start/modal/type/signUpModal.types';
import { TagModal } from '@/ui/start/modal/tagModal';

export const SignUpModal = ({ onSubmit, onChange, onClick }: SignUpModalProps) => {
  const [toggleSignUpModal, setToggleSignUpModal] = useState<boolean>(false);
  const [toggleTagModal, setToggleTagModal] = useState<boolean>(false);

  const openSignUpModal = () => {
    setToggleSignUpModal(true);
  };

  const openTagModal = () => {
    setToggleTagModal(true);
  };

  const closeTagModal = () => {
    setToggleTagModal(false);
  };

  return (
    <div>
      <button
        onClick={openSignUpModal}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        회원가입
      </button>
      {toggleSignUpModal && (
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
                      Sign Up
                    </h3>
                    <div className='mt-2'>
                      <form onSubmit={onSubmit}>
                        <input
                          type='text'
                          id='name'
                          name='name'
                          placeholder='이름을 입력해주세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handleNameChange}
                        />
                        <select
                          id='gender'
                          name='gender'
                          onChange={onChange.handleGenderChange}
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                        >
                          <option defaultValue='(male/female)' hidden>
                            (남/여)
                          </option>
                          <option value='MALE'>남</option>
                          <option value='FEMALE'>여</option>
                        </select>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          placeholder='이메일을 입력해주세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handleEmailChange}
                        />
                        <button
                          onClick={onClick.handleSendEmailToServer}
                          className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                        >
                          전송
                        </button>
                        <input
                          type='text'
                          id='emailCode'
                          name='emailCode'
                          placeholder='이메일 인증 코드를 입력해주세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handleEmailCodeChange}
                        />
                        <button
                          onClick={onClick.handleSendEmailCodeToServer}
                          className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                        >
                          확인
                        </button>
                        <input
                          type='password'
                          id='password'
                          name='password'
                          placeholder='비밀번호를 입력해주세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handlePasswordChange}
                        />
                        <input
                          type='password'
                          id='confirmPassword'
                          name='confirmPassword'
                          placeholder='비밀번호를 확인하세요'
                          className='w-full border rounded-md px-3 py-2 mt-1 mb-3'
                          onChange={onChange.handleConfirmPasswordChange}
                        />
                        <button
                          type='button'
                          onClick={openTagModal}
                          className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded'
                        >
                          태그선택
                        </button>
                        {toggleTagModal && (
                          <TagModal
                            show={toggleTagModal}
                            onHide={closeTagModal}
                            onClick={closeTagModal}
                          />
                        )}
                        <div className='flex justify-end mt-4'>
                          <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                          >
                            저장하기
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
