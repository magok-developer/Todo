import Calender from "@/Components/Calendar/Calender";
import Input from "@/Components/Input/Input";
import Textarea from "@/Components/Textarea/Textarea";
import useChangeDateRange from "@/hook/useChangeDateRange";
import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

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

type Props = {
  setCreateVisible: any;
};
const CreateDiary = ({ setCreateVisible }: Props) => {
  const { date, onChange: onChangeDate } = useChangeDateRange();
  const [input, setInput] = useState("");
  const [textarea, setTextarea] = useState("");

  const handleChangeInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleChangeTextarea = (e: any) => {
    setTextarea(e.target.value);
  };

  const handleClickSave = () => {};
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
              src={item.common}
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
          onClick={() => setCreateVisible(false)}
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

export default CreateDiary;

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
