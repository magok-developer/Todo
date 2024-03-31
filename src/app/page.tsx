"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import Todo from "./components/Todo/Todo";
import { useState } from "react";
import Diary from "./components/Diary/Diary";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const week = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function Home() {
  const [todoMenuVisible, setTodoMenuVisible] = useState(false);
  const [diaryMenuVisible, setDiaryMenuVisible] = useState(false);
  const [mode, setMode] = useState(false);
  const today = new Date();

  const formattedYear = `${today.getFullYear()} `;
  const formattedMonth = `${month[today.getMonth()]}`;
  const formattedDate = `${today.getDate()}`;
  const formattedWeek = `${week[today.getDay()]}`;

  const handleClickMenu = () => {
    setTodoMenuVisible(!todoMenuVisible);
  };

  const handleClickDiaryMenu = () => {
    setDiaryMenuVisible(!diaryMenuVisible);
  };
  const handleClickMode = () => {
    setMode(!mode);
  };
  return (
    <Container>
      <Title>
        <Image
          src='/images/icons/menu.svg'
          width={24}
          height={24}
          alt='menu'
          onClick={mode ? handleClickDiaryMenu : handleClickMenu}
          style={{ cursor: "pointer" }}
        />
        <Image
          src={mode ? "/images/icons/todo.svg" : "/images/icons/book.svg"}
          width={24}
          height={24}
          alt='book'
          onClick={handleClickMode}
          style={{ cursor: "pointer" }}
        />
        <DateWrap>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              {formattedDate}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                {formattedYear}
              </span>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                {formattedMonth}
              </span>
            </div>
          </div>
          <span style={{ fontSize: "12px", fontWeight: "bold" }}>
            {formattedWeek}
          </span>
        </DateWrap>
      </Title>
      {mode ? (
        <Diary diaryMenuVisible={diaryMenuVisible} />
      ) : (
        <Todo todoMenuVisible={todoMenuVisible} />
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 512px;
  background-color: ${color.white};
  padding: 12px 30px;
  box-sizing: border-box;

  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
`;

const DateWrap = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  font-family: "Nunito", sans-serif;
`;
