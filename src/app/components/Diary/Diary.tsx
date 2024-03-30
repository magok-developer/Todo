import { color } from "@/styles/color";
import styled from "@emotion/styled";
import React, { useState } from "react";
import DiaryItem from "./components/DiaryItem";

const data = [
  {
    id: 1,
    title: "첫번째",
    content:
      "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    date: "2024.03.22",
    icon: "/images/battery/charge_green.svg",
  },
  {
    id: 2,
    title: "두번째",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/half_green.svg",
  },
  {
    id: 3,
    title: "세번째",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/full_green.svg",
  },
  {
    id: 4,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/one_green.svg",
  },
  {
    id: 5,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/one_green.svg",
  },
  {
    id: 6,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/one_green.svg",
  },
  {
    id: 7,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/one_green.svg",
  },
];

export type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
  icon: string;
};

const Diary = () => {
  const [diary, setDiary] = useState<Diary[]>(data);

  const handleClickDelete = (id: number) => {
    setDiary(diary.filter((item) => item.id !== id));
  };

  return (
    <>
      <Content>
        <DiaryItem diary={diary} handleClickDelete={handleClickDelete} />
      </Content>
    </>
  );
};

export default Diary;

const Content = styled.div`
  width: 512px;
  height: 350px;
  margin-top: 4px;
  background-color: ${color.white};
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  position: relative;
`;
