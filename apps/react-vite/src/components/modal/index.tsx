const Modal = ({ show, onHide, children }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <button onClick={onHide} className='absolute top-0 right-0 m-2'>
          x
        </button>
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children }) => {
  return <div className='font-bold text-lg mb-4'>{children}</div>;
};

const ModalTitle = ({ children }) => {
  return <div>{children}</div>;
};

const ModalBody = ({ children }) => {
  return <div>{children}</div>;
};

const ModalFooter = ({ children }) => {
  return <div className='mt-4'>{children}</div>;
};

export { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter };
