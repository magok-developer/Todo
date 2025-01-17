import styled from "@emotion/styled";
import Image from "next/image";
import { color } from "@/styles/color";
import Input from "@/Components/Input/Input";
import useTodoStore, { TodoType } from "@/store/todo.store";
import { useEffect, useRef, useState } from "react";
import ShowAlert from "@/Components/Alert/Alert";

type Props = {
  todos: TodoType[];
};

const TodoItem = ({ todos }: Props) => {
  const {
    handleClickCheck,
    handleClickDelete,
    handleClickEdit,
    handleChange,
    setTodos,
  } = useTodoStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent): void => {
      inputRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(e.target as Node)) {
          handleClickEdit(todos[index].id);
        }
      });
    };

    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, [inputRefs, todos, handleClickEdit]);

  const calculateDday = (targetDate: string): number => {
    const today = new Date();
    const target = new Date(targetDate);

    const difference = target.getTime() - today.getTime();

    const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const dDay = (date: string) => {
    const daysDifference = calculateDday(date);

    if (daysDifference > 0) {
      return <DDayText color={color.blue}>D-{daysDifference}</DDayText>;
    } else if (daysDifference === 0) {
      return <DDayText color={color.green}>D-DAY!</DDayText>;
    } else if (daysDifference < 0) {
      return (
        <DDayText color={color.red}>D+{Math.abs(daysDifference)}</DDayText>
      );
    }
  };

  const handleOnkeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleClickEdit(e);
    }
  };

  const onClickDelete = (id: number) => {
    ShowAlert({
      handleClickDelete,
      id: id,
    });
  };

  return (
    mounted && (
      <Container>
        {todos.map((item, index) => (
          <ContentWrap key={`${item.id}_${index}`}>
            <Image
              src={
                item.checked === false
                  ? "/images/icons/none-check.svg"
                  : "images/icons/check.svg"
              }
              width={20}
              height={20}
              alt='check'
              onClick={() => handleClickCheck(item.id)}
              style={{ cursor: "pointer" }}
            />
            {item.isEditable ? (
              <Input
                mode='small'
                value={item.todo}
                onChange={(e) => handleChange(item.id, e)}
                style={{ width: "200px", textAlign: "center" }}
                onKeyDown={handleOnkeyPress}
                ref={(el: any) => (inputRefs.current[index] = el)}
              />
            ) : (
              <div className={item.checked ? "checked" : "common"}>
                {item.todo}
              </div>
            )}
            <div className='right-wrap'>
              <div>{dDay(item.date)}</div>
              <div className='icon-wrap'>
                {item.isEditable ? (
                  <Image
                    src='images/icons/enter.svg'
                    width={16}
                    height={16}
                    alt='edit'
                    onClick={() => handleClickEdit(item.id)}
                  />
                ) : (
                  <Image
                    src='images/icons/edit.svg'
                    width={16}
                    height={16}
                    alt='edit'
                    onClick={() => handleClickEdit(item.id)}
                  />
                )}
                <Image
                  src='images/icons/delete.svg'
                  width={16}
                  height={16}
                  alt='edit'
                  onClick={() => onClickDelete(item.id)}
                />
              </div>
            </div>
          </ContentWrap>
        ))}
      </Container>
    )
  );
};

export default TodoItem;
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${color.blue}; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${color.gray}; /*스크롤바 뒷 배경 색상*/
  }
`;

const ContentWrap = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 50px;
  box-sizing: border-box;

  font-size: 14px;

  .right-wrap {
    display: flex;
    gap: 8px;
  }

  .icon-wrap {
    display: flex;
    align-items: center;
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
  .checked {
    text-decoration: line-through;
  }
`;

const DDayText = styled.div<{ color: string }>`
  width: 50px;
  color: ${({ color }) => color};
  text-align: center;
  font-weight: bold;
  font-size: 12px;
`;
