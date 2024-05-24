import { color } from "@/styles/color";
import styled from "@emotion/styled";

type Props = {
  value: string;
  style?: React.CSSProperties;
  onChange: (e: any) => void;
};

const Textarea = ({ value, style, onChange }: Props) => {
  return <TextareaStyle value={value} style={style} onChange={onChange} />;
};

export default Textarea;

const TextareaStyle = styled.textarea`
  width: 100%;
  height: 180px;
  border-radius: 6px;
  padding: 10px;

  background-color: ${color.gray};
  border: none;
  outline: none;

  box-sizing: border-box;

  resize: none;
  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${color.deepGray}; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
`;
