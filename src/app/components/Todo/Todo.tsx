"use client";

import Button from "@/Components/Button/Button";
import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";

export default function Todo() {
  const today = new Date();

  var month = [
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

  const formattedYear = `${today.getFullYear()} `;
  const formattedMonth = `${month[today.getMonth() + 1]}`;
  const formattedDate = `${today.getDate()}`;
  const formattedWeek = `${week[today.getDay()]}`;

  const data = [
    {
      id: 1,
      todo: "끝내주게 프로젝트 하기",
      date: "2023-04-01",
      checked: false,
      isEditable: false,
    },
    {
      id: 2,
      todo: "끝내주게 포폴 하기",
      date: "2023-04-06",
      checked: false,
      isEditable: false,
    },
    {
      id: 3,
      todo: "디데이",
      date: "2023-03-28",
      checked: false,
      isEditable: false,
    },
  ];

  return (
    <Container>
      <Title>
        <Image src='/images/icons/menu.svg' width={24} height={24} alt='menu' />
        <Image src='/images/icons/book.svg' width={24} height={24} alt='book' />
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
      <Content>
        {data.map((item) => (
          <ContentWrap>
            <Image
              src={
                item.checked === false
                  ? "/images/icons/none-check.svg"
                  : "images/icons/check.svg"
              }
              width={24}
              height={24}
              alt='check'
            />
            <div>{item.todo}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <div>{item.date}</div>
              <div className='icon-wrap'>
                <Image
                  src='images/icons/edit.svg'
                  width={20}
                  height={20}
                  alt='edit'
                />
                <Image
                  src='images/icons/delete.svg'
                  width={20}
                  height={20}
                  alt='edit'
                />
              </div>
            </div>
          </ContentWrap>
        ))}

        <Button>+ New Todo</Button>
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 512px;
  background-color: ${color.white};
  padding: 12px 16px;
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

const Content = styled.div`
  width: 512px;
  height: 400px;
  margin-top: 20px;
  background-color: ${color.white};
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
`;

const ContentWrap = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 50px;
  box-sizing: border-box;

  .icon-wrap {
    display: flex;
    gap: 8px;
    opacity: 0;
  }

  &:hover {
    background-color: ${color.gray};
    .icon-wrap {
      opacity: 1;
      cursor: pointer;
    }
  }
`;
