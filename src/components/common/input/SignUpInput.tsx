import React, { type ChangeEventHandler } from "react";

export interface SignUpInputProps {
  type: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SignUpInput: React.FC<SignUpInputProps> = ({
  type,
  placeholder,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
      focus:bg-white focus:outline-none"
    />
  );
};
