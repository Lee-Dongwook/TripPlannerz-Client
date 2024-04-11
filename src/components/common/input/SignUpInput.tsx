import React from "react";

interface SignUpInputProps {
  type: string;
  placeholder: string;
  onChange: (event: any) => void;
}

const SignUpInput: React.FC<SignUpInputProps> = ({
  type,
  placeholder,
  onChange,
}) => {
  return (
    <input
      type={type}
      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
  focus:bg-white focus:outline-none"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SignUpInput;
