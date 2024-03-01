import { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

import { postRequestAccompanyToServer } from '@/application/api/detail/postRequestAccompanyToServer';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

export const RequestAccompany = ({ tripUuid }) => {
  const token = useSelector((state: any) => state.token.token);

  const [requsetAccompanyModalState, setRequestAccompanyModalState] = useState<boolean>(false);

  const [requestContent, setRequestContent] = useState<string>('');

  const handleOpenRequestAccompanyModal = () => {
    setRequestAccompanyModalState(true);
  };

  const handleCloseRequestAccompanyModal = () => {
    setRequestAccompanyModalState(false);
  };

  const handleRequestContent = (event) => {
    setRequestContent(event.target.value);
  };

  const handleRequestAccompany = async () => {
    const postToServer = {
      review: requestContent,
      tripUUID: tripUuid,
    };

    const response = await postRequestAccompanyToServer(token, postToServer);
  };

  return (
    <>
      <Button onClick={handleOpenRequestAccompanyModal}>동행 신청</Button>
      <Modal
        open={requsetAccompanyModalState}
        onCancel={handleCloseRequestAccompanyModal}
        title='동행 신청'
        footer={[
          <Button onClick={handleCloseRequestAccompanyModal}>닫기</Button>,
          <Button onClick={handleRequestAccompany}>신청하기</Button>,
        ]}
      >
        <Form>
          <Form.Item>
            <TextArea
              style={{ height: '300px' }}
              placeholder='신청서를 작성해주세요'
              onChange={handleRequestContent}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
