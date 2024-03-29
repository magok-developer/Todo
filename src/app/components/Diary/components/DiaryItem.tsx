import React, { useState } from "react";
import { Diary } from "../Diary";
import Image from "next/image";
import styled from "@emotion/styled";
import { color } from "@/styles/color";
import Button from "@/Components/Button/Button";
import DiaryDetail from "./DiaryDetail";

type Props = {
  diary: Diary[];
};

const DiaryItem = ({ diary }: Props) => {
  const [detailVisible, setDetailVisible] = useState<number | null>(null);

  const handleClickDetail = (id: number) => {
    setDetailVisible(id);
  };

  return (
    <Container>
      {detailVisible !== null ? (
        <DiaryDetail diaryId={detailVisible} diary={diary} />
      ) : (
        <DiaryList>
          {diary.map((item, index) => (
            <Wrap
              key={`${item.id}_${index}`}
              onClick={() => handleClickDetail(item.id)}
            >
              <div>{item.date}</div>
              <div className='title'>{item.title}</div>
              <Image
                src='/images/icons/delete.svg'
                width={20}
                height={20}
                alt='delete'
                className='icon'
              />
            </Wrap>
          ))}
          <Button>+ New Diary</Button>
        </DiaryList>
      )}
    </Container>
  );
};

export default DiaryItem;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: auto;

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

const DiaryList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  font-size: 14px;
  .title {
    font-weight: bold;
  }
  .icon {
    opacity: 0;
  }

  &:hover {
    background-color: ${color.gray};
    .icon {
      opacity: 1;
    }
  }
`;
