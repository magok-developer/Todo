import { useState } from "react";
import { Diary } from "../Diary";
import Input from "@/Components/Input/Input";
import { color } from "@/styles/color";
import Textarea from "@/Components/Textarea/Textarea";
import styled from "@emotion/styled";
import Image from "next/image";
import Calender from "@/Components/Calendar/Calender";
import useChangeDateRange from "@/hook/useChangeDateRange";

type Props = {
  selectedDiary: Diary;
  setEditVisible: any;
};

const icons = [
  {
    common: "/images/battery/charge.svg",
    choice: "/images/battery/charge_green.svg",
  },
  {
    common: "/images/battery/one.svg",
    choice: "/images/battery/one_green.svg",
  },
  {
    common: "/images/battery/half.svg",
    choice: "/images/battery/half_green.svg",
  },
  {
    common: "/images/battery/full.svg",
    choice: "/images/battery/full_green.svg",
  },
  {
    common: "/images/battery/empty.svg",
    choice: "/images/battery/empty_green.svg",
  },
];

const DiaryEdit = ({ selectedDiary, setEditVisible }: Props) => {
  const { date, onChange: onChangeDate } = useChangeDateRange();
  const [newDiary, setNewDiary] = useState<Diary>(selectedDiary);
  const [input, setInput] = useState(selectedDiary.title);
  const [textarea, setTextarea] = useState(selectedDiary.content);

  const handleChangeInput = (e: any) => {
    setNewDiary({ ...newDiary, title: e.target.value });
    setInput(e.target.value);
  };

  const handleChangeTextarea = (e: any) => {
    setNewDiary({ ...newDiary, content: e.target.value });
    setTextarea(e.target.value);
  };

  const handleClickSave = () => {
    setEditVisible(false);
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          {icons.map((item, index) => (
            <Image
              key={index}
              src={
                selectedDiary.icon === item.choice ? item.choice : item.common
              }
              width={24}
              height={24}
              alt='battery'
            />
          ))}
        </div>
        <Calender onChange={onChangeDate} date={date.date} />
      </div>
      <Input
        value={input}
        style={{
          background: color.gray,
          border: `1px solid ${color.gray}`,
          width: "100%",
        }}
        onChange={handleChangeInput}
      />
      <Textarea
        value={textarea}
        style={{ width: "100%", marginTop: "12px" }}
        onChange={handleChangeTextarea}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "12px",
          gap: "8px",
        }}
      >
        <div
          className='button'
          style={{
            background: color.gray,
            color: color.deepGray,
            cursor: "pointer",
          }}
          onClick={() => setEditVisible(false)}
        >
          이전
        </div>
        <div
          className='button'
          style={{
            background: color.blue,
            color: color.white,
            cursor: "pointer",
          }}
          onClick={handleClickSave}
        >
          등록
        </div>
      </div>
    </Container>
  );
};

export default DiaryEdit;

const Container = styled.div`
  padding: 24px;

  .button {
    width: 51px;
    height: 26px;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
`;
