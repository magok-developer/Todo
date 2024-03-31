import { color } from "@/styles/color";
import styled from "@emotion/styled";
import React, { useState } from "react";
import DiaryItem from "./components/DiaryItem";

const data = [
  {
    id: 1,
    title: "첫번째",
    content:
      "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    date: "2024.03.22",
    icon: "/images/battery/charge_green.svg",
  },
  {
    id: 2,
    title: "두번째",
    content: "내용내용",
    date: "2024.03.21",
    icon: "/images/battery/half_green.svg",
  },
  {
    id: 3,
    title: "세번째",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/full_green.svg",
  },
  {
    id: 4,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.27",
    icon: "/images/battery/one_green.svg",
  },
  {
    id: 5,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.22",
    icon: "/images/battery/one_green.svg",
  },
  {
    id: 6,
    title: "제목제목",
    content: "내용내용",
    date: "2024.04.21",
    icon: "/images/battery/one_green.svg",
  },
  {
    id: 7,
    title: "제목제목",
    content: "내용내용",
    date: "2024.03.10",
    icon: "/images/battery/one_green.svg",
  },
];

export type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
  icon: string;
};

type Props = {
  diaryMenuVisible: boolean;
};

const Diary = ({ diaryMenuVisible }: Props) => {
  const [diary, setDiary] = useState<Diary[]>(data);
  const [filter, setFilter] = useState("");

  const handleClickDelete = (id: number) => {
    setDiary(diary.filter((item) => item.id !== id));
  };

  const handleClickSort = (selectedFilter: string) => {
    if (selectedFilter === "new" && filter !== "new") {
      const newList = diary.slice().sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setDiary(newList);
      setFilter("new");
    } else if (selectedFilter === "old" && filter !== "old") {
      const oldList = diary.slice().sort(function (a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setDiary(oldList);
      setFilter("old");
    }
  };
  return (
    <>
      {diaryMenuVisible && (
        <Menu>
          <MenuWrap>
            <div style={{ color: color.black, fontWeight: "bold" }}>
              {diary.length} items
            </div>
            <FilterWrap>
              <div
                onClick={() => handleClickSort("new")}
                className={filter === "new" ? "choice" : "common"}
              >
                최신순
              </div>
              <div
                onClick={() => handleClickSort("old")}
                className={filter === "old" ? "choice" : "common"}
              >
                오래된순
              </div>
            </FilterWrap>
          </MenuWrap>
        </Menu>
      )}
      <Content>
        <DiaryItem diary={diary} handleClickDelete={handleClickDelete} />
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
