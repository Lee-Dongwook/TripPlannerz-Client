import React, { type ChangeEventHandler } from "react";

export interface PasswordInputProps {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  onChange,
}) => {
  return (
    <input
      type="password"
      placeholder={placeholder}
      onChange={onChange}
      className="input input-bordered w-full mb-4"
    />
  );
};
