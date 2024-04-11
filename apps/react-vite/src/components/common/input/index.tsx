const Input = ({ className, size = 'medium', ...props }) => {
  const baseStyle = 'border rounded shadow focus:outline-none focus:shadow-outline';
  const sizes = {
    small: 'text-xs p-2',
    medium: 'text-sm p-3',
    large: 'text-lg p-4',
  };

  const sizeStyle = sizes[size];

  return <input className={`${baseStyle} ${sizeStyle} ${className}`} {...props} />;
};

export { Input };
