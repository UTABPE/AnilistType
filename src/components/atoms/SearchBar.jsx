import { Input } from 'antd';

export const SearchBar = ({ onChange }) => {
  return (
    <Input
      className="w-full max-w-[600px] h-[60px] px-3 rounded focus:outline-none"
      placeholder="Search"
      onChange={onChange}
    />
  );
};
