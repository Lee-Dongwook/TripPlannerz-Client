import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'confirm' | 'cancel' | 'error';
  disabled?: boolean;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  variant = 'confirm',
  disabled = false,
  ...props
}) => {
  const variantClasses = {
    confirm: 'bg-blue-500 hover:bg-blue-700 text-white',
    cancel: 'bg-gray-500 hover:bg-gray-700 text-white',
    error: 'bg-red-500 hover:bg-red-700 text-white',
  };

  return (
    <button
      className={`font-bold py-2 px-4 rounded ${variantClasses[variant] ?? ''}${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
