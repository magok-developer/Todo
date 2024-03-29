"use client";

import Button from "@/Components/Button/Button";
import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import TodoItem from "./Components/TodoItem";
import CreateTodo from "./Components/CreateTodo";

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
  {
    id: 4,
    todo: "디데이",
    date: "2023-03-28",
    checked: false,
    isEditable: false,
  },
  {
    id: 5,
    todo: "디데이",
    date: "2023-03-28",
    checked: false,
    isEditable: false,
  },
  {
    id: 6,
    todo: "디데이",
    date: "2023-03-28",
    checked: false,
    isEditable: false,
  },
  {
    id: 7,
    todo: "디데이",
    date: "2023-03-28",
    checked: false,
    isEditable: false,
  },
];

export type Todo = {
  id: number;
  todo: string;
  date: string;
  checked: boolean;
  isEditable: boolean;
};

export default function Todo() {
  const [todo, setTodo] = useState<Todo[]>(data);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newTodoVisible, setNewTodoVisible] = useState(false);

  const today = new Date();

  const formattedYear = `${today.getFullYear()} `;
  const formattedMonth = `${month[today.getMonth()]}`;
  const formattedDate = `${today.getDate()}`;
  const formattedWeek = `${week[today.getDay()]}`;

  const handleClickCheck = (id: number) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClickDelete = (id: number) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleClickMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickAll = () => {
    setFilter("all");
  };

  const handleClickActive = () => {
    setFilter("active");
  };
  const handleClickComplete = () => {
    setFilter("complete");
  };

  const filterTodo = (): Todo[] => {
    if (filter === "all") {
      return todo;
    } else if (filter === "active") {
      return todo.filter((item) => item.checked === false);
    } else if (filter === "complete") {
      return todo.filter((item) => item.checked === true);
    }
    return [];
  };

  const handleChange = (id: number, e: any) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, todo: e.target.value } : item
      )
    );
  };

  const handleClickEdit = (id: number) => {
    setTodo(
      todo.map((item) =>
        item.id === id
          ? { ...item, isEditable: !item.isEditable }
          : { ...item, isEditable: false }
      )
    );
  };

  const handleClickClear = () => {
    setTodo(todo.filter((item) => !item.checked));
  };

  const handleClickNewTodo = () => {
    setNewTodoVisible(true);
  };

  return (
    <Container>
      <Title>
        <Image
          src='/images/icons/menu.svg'
          width={24}
          height={24}
          alt='menu'
          onClick={handleClickMenu}
          style={{ cursor: "pointer" }}
        />
        <Image
          src='/images/icons/book.svg'
          width={24}
          height={24}
          alt='book'
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
      {menuVisible && (
        <Menu>
          <MenuWrap>
            <div style={{ color: color.black, fontWeight: "bold" }}>
              {todo.length} items
            </div>
            <FilterWrap>
              <div
                onClick={handleClickAll}
                className={filter === "all" ? "choice" : "common"}
              >
                All
              </div>
              <div
                onClick={handleClickActive}
                className={filter === "active" ? "choice" : "common"}
              >
                Active
              </div>
              <div
                onClick={handleClickComplete}
                className={filter === "complete" ? "choice" : "common"}
              >
                Complete
              </div>
            </FilterWrap>
            <div
              style={{ color: color.deepGray, cursor: "pointer" }}
              onClick={handleClickClear}
            >
              Clear Complete
            </div>
          </MenuWrap>
        </Menu>
      )}
      <Content>
        <TodoItem
          todo={filterTodo()}
          handleClickCheck={handleClickCheck}
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
          handleChange={handleChange}
        />
        {newTodoVisible ? (
          <CreateTodo />
        ) : (
          <Button onClick={handleClickNewTodo}>+ New Todo</Button>
        )}
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

const Menu = styled.div`
  width: 512px;
  height: 50px;
  margin-top: 4px;
  background-color: ${color.white};
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  display: flex;
  align-items: center;

  font-size: 12px;
`;

const MenuWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  .choice {
    color: ${color.blue};
    cursor: pointer;
  }
  .common {
    cursor: pointer;
  }
`;

const FilterWrap = styled.div`
  display: flex;
  gap: 16px;

  color: ${color.deepGray};
  font-weight: bold;
`;

const Content = styled.div`
  width: 512px;
  height: 350px;
  margin-top: 4px;
  background-color: ${color.white};
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  position: relative;
`;
