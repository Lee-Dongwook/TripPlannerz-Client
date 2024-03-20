export const NoticeDrawer = ({ onClick, onClose, visible, messages }) => {
  return (
    <>
      <button onClick={onClick} className='text-xl'></button>
      {visible && (
        <div className='fixed top-0 right-0 w-96 h-full z-50 shadow-xl p-4 bg-white'>
          <div className='flex justify-between items-center'>
            <h5 className='text-lg font-semibold'>알림: {messages.length}개</h5>
            <button onClick={onClose} className='text-gray-600'></button>
          </div>
          <hr className='my-2' />
          <ul>
            {messages.map((text, index) => (
              <li key={index} className='my-2'>
                <button className='btn'>{text}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
