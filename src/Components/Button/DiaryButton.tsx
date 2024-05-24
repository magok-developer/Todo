import { color } from "@/styles/color";
import styled from "@emotion/styled";

type DIARY_BUTTON_STYLE_PROPS = {
  color: "back" | "done" | "delete";
};

type Props = DIARY_BUTTON_STYLE_PROPS & {
  children: any;
  onClick: (e?: any) => void;
  className?: string;
};

const DiaryButton = ({ children, onClick, color, className }: Props) => {
  return (
    <Container onClick={onClick} color={color} className={className}>
      {children}
    </Container>
  );
};

export default DiaryButton;

const COLOR_TYPE = {
  ["back"]: {
    background: color.gray,
    color: color.deepGray,
  },
  ["done"]: {
    background: color.blue,
    color: color.white,
  },
  ["delete"]: {
    background: color.red,
    color: color.white,
  },
};

const Container = styled.div<DIARY_BUTTON_STYLE_PROPS>`
  ${({ color }) => COLOR_TYPE[color]}
  width: 51px;
  height: 26px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
`;
