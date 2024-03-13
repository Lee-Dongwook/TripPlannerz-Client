import { Input } from 'antd';

export const NavbarInput = ({ value, placeholder, onChange }) => {
  return <Input value={value} placeholder={placeholder} onChange={onChange} />;
};
