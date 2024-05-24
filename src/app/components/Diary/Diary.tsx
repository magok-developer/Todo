import { color } from "@/styles/color";
import styled from "@emotion/styled";
import DiaryItem from "./Components/DiaryItem";
import useDiaryStore from "@/store/diary.store";

type Props = {
  diaryMenuVisible: boolean;
};

const Diary = ({ diaryMenuVisible }: Props) => {
  const { diaries, filter, setDiaries, setFilter } = useDiaryStore();

  const handleClickSort = (selectedFilter: string) => {
    if (selectedFilter === "new" && filter !== "new") {
      const newList = diaries.slice().sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setDiaries(newList);
      setFilter("new");
    } else if (selectedFilter === "old" && filter !== "old") {
      const oldList = diaries.slice().sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setDiaries(oldList);
      setFilter("old");
    }
  };

  return (
    <>
      {diaryMenuVisible && (
        <Menu>
          <MenuWrap>
            <p className='items'>{diaries.length} items</p>
            <FilterWrap>
              <p
                onClick={() => handleClickSort("new")}
                className={filter === "new" ? "choice" : "common"}
              >
                최신순
              </p>
              <p
                onClick={() => handleClickSort("old")}
                className={filter === "old" ? "choice" : "common"}
              >
                오래된순
              </p>
            </FilterWrap>
          </MenuWrap>
        </Menu>
      )}
      <Content>
        <DiaryItem />
      </Content>
    </>
  );
};

export default Diary;

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
