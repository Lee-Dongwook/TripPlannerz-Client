import type { NavbarButtonProps } from '@/ui/navbar/button/navbarButton.types';

export const NavbarButton = ({ name, style, onClick }: NavbarButtonProps) => {
  return (
    <button style={style} onClick={onClick}>
      {name}
    </button>
  );
};
