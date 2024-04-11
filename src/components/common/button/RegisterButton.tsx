import React from "react";

interface RegisterButtonProps {
  onClick: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
px-4 py-3 mt-6"
    >
      회원가입
    </button>
  );
};

export default RegisterButton;
