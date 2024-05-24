import Button from "@/Components/Button/Button";
import DiaryButton from "@/Components/Button/DiaryButton";
import Calender from "@/Components/Calendar/Calender";
import Input from "@/Components/Input/Input";
import useChangeDateRange from "@/hook/useChangeDateRange";
import useTodoStore from "@/store/todo.store";
import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";

import { useEffect, useState } from "react";

const CreateTodo = () => {
  const { createTodo } = useTodoStore();
  const { date, onChange: onChangeDate } = useChangeDateRange();
  const [newTodoVisible, setNewTodoVisible] = useState(false);
  const [input, setInput] = useState("");
  const [dDay, setDDay] = useState<number>(0);

  const handleClickNewTodo = () => {
    setNewTodoVisible(true);
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleClick = (e: any) => {
    if (input.trim() === "") {
      return;
    } else if (dDay < 0) {
      return;
    } else {
      setNewTodoVisible(false);
      createTodo(input, date.date.toISOString());
      setInput("");
    }
  };

  const handleOnkeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleClick(e);
    }
  };

  useEffect(() => {
    const today = new Date();
    const selectedDate = new Date(date.date);
    const differenceInTime = selectedDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    setDDay(differenceInDays);
  }, [date]);

  const dDayText = () => {
    if (dDay > 0) {
      return `D-${dDay}`;
    } else if (dDay === 0) {
      return "D-DAY!";
    } else {
      return "이미 지나간 날짜는 등록이 불가합니다.";
    }
  };

  const handleClose = () => {
    setNewTodoVisible(false);
    setInput("");
  };

  return (
    <>
      {newTodoVisible ? (
        <Container>
          <Wrap>
            <div style={{ display: "flex" }}>
              <Calender onChange={onChangeDate} date={date.date} />
              <DDayText
                color={
                  dDay > 0 ? color.blue : dDay === 0 ? color.green : color.red
                }
              >
                {dDayText()}
              </DDayText>
              <Image
                src='/images/icons/x.svg'
                width={20}
                height={20}
                alt='x'
                style={{ cursor: "pointer" }}
                onClick={handleClose}
              />
            </div>
            <div className='input-button-wrap'>
              <Input
                value={input}
                onChange={handleChange}
                onKeyDown={handleOnkeyPress}
                style={{ width: "380px" }}
              />
              <DiaryButton
                color='done'
                onClick={handleClick}
                className='button'
              >
                +
              </DiaryButton>
            </div>
          </Wrap>
        </Container>
      ) : (
        <Button onClick={handleClickNewTodo}>+ New Todo</Button>
      )}
    </>
  );
};

export default CreateTodo;

const Container = styled.div`
  position: absolute;
  bottom: -45px;
  left: 15px;
  width: 477px;
  height: 90px;
  background-color: ${color.gray};
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
  padding: 10px 20px;

  box-sizing: border-box;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  .input-button-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  .button {
    width: 49px;
    height: 30px;
    font-size: 20px;
  }
`;

const DDayText = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  width: 300px;
  color: ${({ color }) => color};
  font-weight: bold;
  font-size: 12px;
`;
