import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { Member } from '@/types/Member';
import type { AccompanyList } from '@/types/AccompanyList';

import { getMemberTripInfo } from '@/application/api/my/getMemberTripInfo';
import { postAssignAccompany } from '@/application/api/my/postAssignAccompany';
import { postDenyAccompany } from '@/application/api/my/postDenyAccompany';

function ProfilePage() {
  const token = useSelector((state: any) => state.token.token);

  const [memberInfo, setMemberInfo] = useState<Member>();
  const [accompanyList] = useState<AccompanyList[]>([
    {
      senderName: '테스트 사용자1',
      tripName: '부산',
      comment: '안녕하세요 OOO입니다. 해당 여행에 동행을 하고 싶어서 연락드렸습니다.',
      comment_id: '1',
      tripUUID: '1',
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetMemberInfo = async () => {
    const response = await getMemberTripInfo(token);

    if (response.data) {
      setMemberInfo(response.data);
      setLoading(false);
    } else {
      throw new Error('서버로 부터 유저 정보를 가져오지 못함');
    }
  };

  const handleResponseAccompanyTrue = async (id) => {
    const check = true;

    const postToServer = {
      comment_id: accompanyList.filter((item) => item.comment_id === id)[0].comment_id,
    };

    const response = await postAssignAccompany(token, postToServer, check);

    if (response) {
      alert('동행 신청을 허락하였습니다.');
    }
  };

  const handleResponseAccompanyFalse = async (id) => {
    const check = false;

    const postToServer = {
      comment_id: accompanyList.filter((item) => item.comment_id === id)[0].comment_id,
    };

    const response = await postDenyAccompany(token, postToServer, check);

    if (response) {
      alert('동행 신청을 거부하였습니다.');
    }
  };

  useEffect(() => {
    handleGetMemberInfo();
  }, []);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {loading ? (
        <div className='text-center'>
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900 inline'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          Loading...
        </div>
      ) : (
        <div className='w-full px-4'>
          <h3 className='text-lg font-semibold'>내 정보</h3>
          <div className='bg-white shadow rounded-lg p-4 mb-6'>
            <p>이름: {memberInfo!.name}</p>
            <p>성별: {memberInfo!.gender}</p>
            <p>이메일: {memberInfo!.email}</p>
            <p>선호 태그: {memberInfo!.types?.join(', ')}</p>
          </div>
          <h3 className='text-lg font-semibold'>동행 신청 현황</h3>
          <div className='space-y-4'>
            <div className='bg-white shadow rounded-lg p-4'>
              <p>신청자: 테스트 사용자</p>
              <p>여행: 부산</p>
              <p>신청 내용: 안녕하세요. 해당 여행에 동행을 하고 싶어서 연락드렸습니다.</p>
              <div className='flex justify-end space-x-2'>
                <button className='btn btn-success' onClick={handleResponseAccompanyTrue}>
                  승인
                </button>
                <button className='btn btn-error' onClick={handleResponseAccompanyFalse}>
                  거절
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
