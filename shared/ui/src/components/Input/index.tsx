const Input = () => {
  return (
    <div className='flex flex-col space-y-2 w-full max-w-xs'>
      <input
        type='text'
        id='userInput'
        placeholder='Enter your text'
        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      />
    </div>
  );
};

export default Input;
