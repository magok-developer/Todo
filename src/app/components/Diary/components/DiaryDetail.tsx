import React from "react";
import { Diary } from "../Diary";
import Image from "next/image";
import styled from "@emotion/styled";
import { color } from "@/styles/color";

type Props = {
  diaryId: number;
  diary: Diary[];
};
const DiaryDetail = ({ diaryId, diary }: Props) => {
  const selectedDiary = diary.find((diary) => diary.id === diaryId);
  return (
    <>
      {selectedDiary && (
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
            >
              삭제
            </div>
          </div>
        </Wrap>
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
