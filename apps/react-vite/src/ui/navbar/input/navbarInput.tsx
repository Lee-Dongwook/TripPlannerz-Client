import { Input } from 'antd';

export const NavbarInput = ({ style, value, placeholder, onChange }) => {
  return <Input style={style} value={value} placeholder={placeholder} onChange={onChange} />;
};
