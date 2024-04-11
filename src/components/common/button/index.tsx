const Button = ({
  className,
  onClick,
  children,
  color = "blue",
  size = "medium",
}) => {
  const baseStyle =
    "font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline";

  const colors = {
    blue: "bg-blue-500 hover:bg-blue-700 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-700 text-black",
  };

  const sizes = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-lg",
  };

  const colorStyle = colors[color];
  const sizeStyle = sizes[size];

  return (
    <button
      className={`${baseStyle} ${colorStyle} ${sizeStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
