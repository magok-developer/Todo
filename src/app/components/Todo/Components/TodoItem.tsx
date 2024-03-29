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
            <Input value={item.todo} handleChange={handleChange} id={item.id} />
          ) : (
            <div className={item.checked ? "checked" : "common"}>
              {item.todo}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <div>{item.date}</div>
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
