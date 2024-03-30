import { color } from "@/styles/color";
import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";

type INPUT_STYLE_PROPS = {
  mode?: "small" | "medium";
};

type Props = INPUT_STYLE_PROPS & {
  value?: string;
  onChange?: (e: any) => void;
  style?: React.CSSProperties;
};

const Input = ({ value, onChange, mode = "medium", style }: Props) => {
  return (
    <InputStyle mode-={mode} value={value} onChange={onChange} style={style} />
  );
};

export default Input;

const SIZE_TYPE = {
  ["small"]: {
    width: "200px",
    padding: "8px",
    textAlign: "center",
  },
  ["medium"]: {
    width: "380px",
    padding: "12px",
  },
};

const InputStyle = styled.input<any>`
  ${({ mode }) => SIZE_TYPE[mode as "medium"]};
  display: flex;
  align-items: center;

  outline: none;
  box-sizing: border-box;

  height: 30px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid ${color.deepGray};
`;
