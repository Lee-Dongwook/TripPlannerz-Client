import { useState } from 'react';
import { useSelector } from 'react-redux';
import { postRequestAccompanyToServer } from '@/application/api/detail/postRequestAccompanyToServer';

export const RequestAccompany = ({ tripUuid }) => {
  const token = useSelector((state: any) => state.token.token);

  const [requestAccompanyModalState, setRequestAccompanyModalState] = useState(false);
  const [requestContent, setRequestContent] = useState('');

  const handleOpenRequestAccompanyModal = () => setRequestAccompanyModalState(true);
  const handleCloseRequestAccompanyModal = () => setRequestAccompanyModalState(false);

  const handleRequestContent = (event) => setRequestContent(event.target.value);

  const handleRequestAccompany = async () => {
    const postToServer = { review: requestContent, tripUUID: tripUuid };

    const response = await postRequestAccompanyToServer(token, postToServer);
    console.log(response);
  };

  return (
    <>
      <button
        onClick={handleOpenRequestAccompanyModal}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors'
      >
        동행 신청
      </button>

      {requestAccompanyModalState && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded shadow-lg w-96'>
            <h3 className='text-lg font-medium'>동행 신청</h3>
            <textarea
              className='mt-4 w-full p-2 border rounded'
              placeholder='신청서를 작성해주세요'
              value={requestContent}
              onChange={handleRequestContent}
              style={{ height: '300px' }}
            />
            <div className='flex justify-end gap-2 mt-4'>
              <button
                className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
                onClick={handleCloseRequestAccompanyModal}
              >
                닫기
              </button>
              <button
                className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                onClick={handleRequestAccompany}
              >
                신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
