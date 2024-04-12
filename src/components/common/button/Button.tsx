import React, { type MouseEventHandler } from "react";

export interface ButtonProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="btn btn-primary w-full" onClick={onClick}>
      {label}
    </button>
  );
};
