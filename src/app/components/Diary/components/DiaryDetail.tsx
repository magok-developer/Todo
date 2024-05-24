import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { color } from "@/styles/color";
import DiaryEdit from "./DiaryEdit";

import ShowAlert from "@/Components/Alert/Alert";
import useDiaryStore from "@/store/diary.store";
import DiaryButton from "@/Components/Button/DiaryButton";

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

  const handleClickBack = () => {
    setDetailVisible(null);
  };

  const onClickDelete = (diaryId: number) => {
    ShowAlert({
      handleClickDelete,
      handleClickBack,
      id: diaryId,
    });
  };

  const handleClickEdit = () => {
    setEditVisible(true);
  };

  return (
    <>
      {selectedDiary && editVisible === false ? (
        <Wrap>
          <div className='top-wrap'>
            <div className='title-wrap'>
              <Image
                src={selectedDiary.icon}
                width={20}
                height={20}
                alt='battery'
              />
              <h3 className='title'>{selectedDiary.title}</h3>
            </div>
            <p className='date'>{selectedDiary.date}</p>
          </div>

          <Content>{selectedDiary.content}</Content>

          <div className='button-wrap'>
            <DiaryButton color='back' onClick={handleClickBack}>
              이전
            </DiaryButton>
            <DiaryButton color='done' onClick={handleClickEdit}>
              수정
            </DiaryButton>
            <DiaryButton color='delete' onClick={() => onClickDelete(diaryId)}>
              삭제
            </DiaryButton>
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

  .top-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .title {
    font-weight: bold;
  }

  .date {
    font-size: 12px;
  }

  .button-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    gap: 8px;
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
