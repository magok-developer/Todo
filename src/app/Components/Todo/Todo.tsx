"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";

import useTodoStore, { TodoType } from "@/store/todo.store";
import TodoItem from "./Components/TodoItem";
import CreateTodo from "./Components/CreateTodo";

type Props = {
  todoMenuVisible: boolean;
};

export default function Todo({ todoMenuVisible }: Props) {
  const {
    todos,
    filter,
    handleClickAll,
    handleClickActive,
    handleClickComplete,
    handleClickClear,
  } = useTodoStore();

  const filterTodo = (): TodoType[] => {
    if (filter === "all") {
      return todos;
    } else if (filter === "active") {
      return todos.filter((item) => item.checked === false);
    } else if (filter === "complete") {
      return todos.filter((item) => item.checked === true);
    }
    return [];
  };

  const todoLength = todos.filter((item) => item.checked === false);

  return (
    <Container>
      {todoMenuVisible && (
        <Menu>
          <MenuWrap>
            <p className='items'>{todoLength.length} items</p>
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
            <div className='clear-complete' onClick={handleClickClear}>
              Clear Complete
            </div>
          </MenuWrap>
        </Menu>
      )}
      <Content>
        <TodoItem todos={filterTodo()} />
        <CreateTodo />
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
  .items {
    font-weight: bold;
  }
  .clear-complete {
    color: ${color.deepGray};
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
