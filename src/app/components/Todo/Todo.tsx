"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRef, useState } from "react";
import TodoItem from "./Components/TodoItem";
import CreateTodo from "./Components/CreateTodo";

const data = [
  {
    id: 1,
    todo: "끝내주게 프로젝트 하기",
    date: "2024-04-01",
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
    date: "2024-03-28",
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

type Props = {
  todoMenuVisible: boolean;
};

export default function Todo({ todoMenuVisible }: Props) {
  const [todo, setTodo] = useState<Todo[]>(data);

  const [filter, setFilter] = useState("all");

  const nextId = useRef(4);

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

  const createTodo = (text: string, date: string) => {
    const todo = {
      id: nextId.current,
      todo: text,
      date: date,
      checked: false,
      isEditable: false,
    };

    setTodo((prevTodo) => [...prevTodo, todo]);
    nextId.current++;
  };

  const todoLength = todo.filter((item) => item.checked === false);

  return (
    <Container>
      {todoMenuVisible && (
        <Menu>
          <MenuWrap>
            <div style={{ color: color.black, fontWeight: "bold" }}>
              {todoLength.length} items
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

        <CreateTodo onCreate={createTodo} />
      </Content>
    </Container>
  );
}

const Container = styled.div``;

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
