import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
  };

  return (
    <button className={`font-bold py-2 px-4 rounded ${variantClasses[variant] ?? ''}`} {...props}>
      {children}
    </button>
  );
};

export default ButtonComponent;
