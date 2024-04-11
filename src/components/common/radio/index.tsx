const RadioGroup = ({ children }) => {
  return <div>{children}</div>;
};

const Radio = ({ children, value, onChange, checkedValue }) => {
  return (
    <label className='inline-flex items-center'>
      <input
        type='radio'
        className='form-radio'
        value={value}
        onChange={onChange}
        checked={checkedValue === value}
      />
      <span className='ml-2'>{children}</span>
    </label>
  );
};

export { RadioGroup, Radio };
