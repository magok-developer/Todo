import { color } from "@/styles/color";
import styled from "@emotion/styled";

type Props = {
  value: string;
  style?: React.CSSProperties;
};

const Textarea = ({ value, style }: Props) => {
  return (
    <>
      <TextareaStyle value={value} style={style} />
    </>
  );
};

export default Textarea;

const TextareaStyle = styled.textarea`
  height: 180px;

  padding: 10px;

  background-color: ${color.gray};
  border: none;
  outline: none;

  box-sizing: border-box;
  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${color.deepGray}; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
`;
