import { color } from "@/styles/color";
import styled from "@emotion/styled";

type Props = {
  value: string;
  handleChange: (id: number, e: any) => void;
  id: number;
};
const Input = ({ value, handleChange, id }: Props) => {
  return <InputStyle value={value} onChange={(e) => handleChange(id, e)} />;
};

export default Input;

const InputStyle = styled.input`
  border: 1px solid ${color.deepGray};
  width: 200px;
  height: 30px;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  box-sizing: border-box;
  text-align: center;

  font-size: 14px;
`;
