// src/components/RequestModal.tsx
import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
} from "@/components/common/modal";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [requestContent, setRequestContent] = useState("");

  const handleRequestContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestContent(event.target.value);
  };

  const handleRequestAccompany = () => {
    onSubmit(requestContent);
    setRequestContent("");
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <ModalHeader>
        <ModalTitle>동행 신청</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <input
          type="textarea"
          placeholder="신청서를 작성해주세요"
          value={requestContent}
          onChange={handleRequestContent}
        />
        <button onClick={handleRequestAccompany}>신청하기</button>
      </ModalBody>
    </Modal>
  );
};

export default RequestModal;
