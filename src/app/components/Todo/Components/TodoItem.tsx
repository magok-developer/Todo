import styled from "@emotion/styled";
import Image from "next/image";
import { Todo } from "../Todo";
import { color } from "@/styles/color";
import Input from "@/Components/Input/Input";

type Props = {
  todo: Todo[];
  handleClickCheck: (id: number) => void;
  handleClickDelete: (id: number) => void;
  handleClickEdit: (id: number) => void;
  handleChange: (id: number, e: any) => void;
};

const TodoItem = ({
  todo,
  handleClickCheck,
  handleClickDelete,
  handleClickEdit,
  handleChange,
}: Props) => {
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

  return (
    <Container>
      {todo.map((item, index) => (
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
            />
          ) : (
            <div className={item.checked ? "checked" : "common"}>
              {item.todo}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
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
                onClick={() => handleClickDelete(item.id)}
              />
            </div>
          </div>
        </ContentWrap>
      ))}
    </Container>
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
`;
