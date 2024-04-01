import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { color } from "@/styles/color";
import DiaryEdit from "./DiaryEdit";
import { useDiaryStore } from "@/store/diary.store";

type Props = {
  diaryId: number;
};
const DiaryDetail = ({ diaryId }: Props) => {
  const {
    editVisible,
    setEditVisible,
    handleClickDelete,
    setDetailVisible,
    diaries,
  } = useDiaryStore();

  const selectedDiary = diaries.find((diary) => diary.id === diaryId);

  const onClickDelete = () => {
    handleClickBack();
    handleClickDelete(diaryId);
  };

  const handleClickEdit = () => {
    setEditVisible(true);
  };

  const handleClickBack = () => {
    setDetailVisible(null);
  };

  return (
    <>
      {selectedDiary && editVisible === false ? (
        <Wrap>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Image
                src={selectedDiary.icon}
                width={20}
                height={20}
                alt='battery'
              />
              <div className='title'>{selectedDiary.title}</div>
            </div>
            <div className='date'>{selectedDiary.date}</div>
          </div>

          <Content>{selectedDiary.content}</Content>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "12px",
              gap: "8px",
            }}
          >
            <div
              className='button'
              style={{
                background: color.gray,
                color: color.deepGray,
                cursor: "pointer",
              }}
              onClick={handleClickBack}
            >
              이전
            </div>
            <div
              className='button'
              style={{
                background: color.blue,
                color: color.white,
                cursor: "pointer",
              }}
              onClick={handleClickEdit}
            >
              수정
            </div>
            <div
              className='button'
              style={{
                background: color.red,
                color: color.white,
                cursor: "pointer",
              }}
              onClick={onClickDelete}
            >
              삭제
            </div>
          </div>
        </Wrap>
      ) : (
        selectedDiary &&
        editVisible && <DiaryEdit selectedDiary={selectedDiary} />
      )}
    </>
  );
};

export default DiaryDetail;

const Wrap = styled.div`
  height: 100%;
  padding: 24px;
  overflow: hidden;
  .title {
    font-weight: bold;
  }
  .date {
    font-size: 12px;
  }
  .button {
    width: 51px;
    height: 26px;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
`;

const Content = styled.div`
  background: ${color.gray};
  height: 219px;
  padding: 10px;

  overflow-y: auto;
  margin-top: 12px;

  font-size: 14px;

  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${color.deepGray}; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
`;
