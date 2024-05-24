import styled from "@emotion/styled";
import { color } from "@/styles/color";
import Button from "@/Components/Button/Button";
import DiaryDetail from "./DiaryDetail";
import CreateDiary from "./CreateDiary";
import Image from "next/image";
import useDiaryStore from "@/store/diary.store";

const DiaryItem = () => {
  const {
    diaries,
    setDetailVisible,
    setCreateVisible,
    detailVisible,
    createVisible,
  } = useDiaryStore();

  const handleClickDetail = (id: number) => {
    setDetailVisible(id);
  };

  const handleClickCreate = () => {
    setCreateVisible(true);
  };

  return (
    <Container>
      {detailVisible !== null ? (
        <DiaryDetail diaryId={detailVisible} />
      ) : createVisible ? (
        <CreateDiary />
      ) : (
        <DiaryList>
          {diaries.map((item, index) => (
            <Wrap
              key={`${item.id}_${index}`}
              onClick={() => handleClickDetail(item.id)}
            >
              <div>{item.date}</div>
              <div className='title'>{item.title}</div>
              <Image src={item.icon} width={20} height={20} alt='icon' />
            </Wrap>
          ))}
          <Button onClick={handleClickCreate}>+ New Diary</Button>
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
