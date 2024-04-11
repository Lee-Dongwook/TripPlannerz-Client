import React from "react";

interface SelectTagButtonProps {
  onClick: () => void;
}

const SelectTagButton: React.FC<SelectTagButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
    >
      태그선택
    </button>
  );
};

export default SelectTagButton;
