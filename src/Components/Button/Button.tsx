import { color } from "@/styles/color";
import styled from "@emotion/styled";

type Props = {
  children: any;
};

const Button = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default Button;

const Container = styled.div`
  width: 140px;
  text-align: center;
  box-sizing: border-box;
  background-color: ${color.gray};
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: bold;

  position: absolute;
  bottom: -20px;
  left: 190px;

  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;
