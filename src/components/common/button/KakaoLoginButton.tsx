import React from "react";

interface KakaoLoginButtonProps {
  onClick: () => void;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="w-full block bg-yellow-200 hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 mt-6 border border-gray-300"
      onClick={onClick}
    >
      카카오 소셜 로그인
    </button>
  );
};

export default KakaoLoginButton;
