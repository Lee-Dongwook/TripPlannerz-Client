const Spinner = ({ color, size }: { color?: string; size?: number }) => {
  const spinnerColor = `border-${color}`;

  const width = `w-${size}`;
  const height = `h-${size}`;

  return (
    <div
      className={`inline-block ${width} ${height} animate-spin rounded-full border-4 border-solid ${spinnerColor} border-r-transparent align-[-0.125rem] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role='status'
    >
      <span className='!absolute !-m-px !h-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
        로딩 중...
      </span>
    </div>
  );
};

export default Spinner;
