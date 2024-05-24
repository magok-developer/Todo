import { color } from "@/styles/color";
import styled from "@emotion/styled";
import { forwardRef } from "react";

type INPUT_STYLE_PROPS = {
  mode?: "small" | "medium";
  color?: "diary" | "todo";
};

type Props = INPUT_STYLE_PROPS & {
  value?: string;
  onChange?: (e: any) => void;
  style?: React.CSSProperties;
  onKeyDown?: (e: any) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { mode = "medium", color = "todo", value, onChange, style, onKeyDown },
    ref
  ) => {
    return (
      <InputStyle
        mode-={mode}
        color={color}
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    );
  }
);

Input.displayName = "Input";

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

const COLOR_TYPE = {
  ["diary"]: {
    background: color.gray,
    border: `1px solid ${color.gray}`,
    width: "100%",
    padding: "0px 10px",
  },
  ["todo"]: {
    background: color.white,
    border: `1px solid ${color.deepGray}`,
  },
};

const InputStyle = styled.input<any>`
  ${({ mode }) => SIZE_TYPE[mode as "medium"]};
  ${({ color }) => COLOR_TYPE[color as "todo"]}
  display: flex;
  align-items: center;

  outline: none;
  box-sizing: border-box;

  height: 30px;
  border-radius: 4px;
  font-size: 14px;
`;
