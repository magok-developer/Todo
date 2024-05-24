import { useState } from "react";

import Input from "@/Components/Input/Input";
import { color } from "@/styles/color";
import Textarea from "@/Components/Textarea/Textarea";
import styled from "@emotion/styled";
import Image from "next/image";
import Calender from "@/Components/Calendar/Calender";
import useChangeDateRange from "@/hook/useChangeDateRange";
import useDiaryStore, { DiaryType } from "@/store/diary.store";
import { icons } from "../../../../../public/static/icons";
import DiaryButton from "@/Components/Button/DiaryButton";

type Props = {
  selectedDiary: DiaryType;
};

const DiaryEdit = ({ selectedDiary }: Props) => {
  const { date, onChange: onChangeDate } = useChangeDateRange();
  const [newDiary, setNewDiary] = useState<DiaryType>(selectedDiary);
  const [input, setInput] = useState(selectedDiary.title);
  const [textarea, setTextarea] = useState(selectedDiary.content);

  const iconIndex = icons.findIndex(
    (item) => item.choice === selectedDiary.icon
  );

  const [icon, setIcon] = useState(iconIndex);

  const { setEditVisible, diaries, setDiaries } = useDiaryStore();

  const handleChangeInput = (e: any) => {
    setNewDiary({ ...newDiary, title: e.target.value });
    setInput(e.target.value);
  };

  const handleChangeTextarea = (e: any) => {
    setNewDiary({ ...newDiary, content: e.target.value });
    setTextarea(e.target.value);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleClickIcon = (index: number) => {
    if (icon === index) {
      setIcon(-1);
    } else {
      setIcon(index);
    }
  };

  const handleClickSave = () => {
    const formattedDate = formatDate(date.date);
    const updatedIcon = icon !== -1 ? icons[icon].choice : selectedDiary.icon;
    const updatedDiary = {
      ...selectedDiary,
      title: newDiary.title,
      content: newDiary.content,
      date: formattedDate,
      icon: updatedIcon,
    };

    const updatedDiaries = diaries.map((diary) =>
      diary.id === selectedDiary.id ? updatedDiary : diary
    );

    setDiaries(updatedDiaries);
    setEditVisible(false);
  };

  const handleClickPrevious = () => {
    setNewDiary(selectedDiary);

    setIcon(iconIndex);
    setEditVisible(false);
  };

  return (
    <Container>
      <div className='top-wrap'>
        <div className='icon-wrap'>
          {icons.map((item, index) => (
            <Image
              key={index}
              src={icon === index ? item.choice : item.common}
              width={24}
              height={24}
              alt='battery'
              onClick={() => handleClickIcon(index)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
        <Calender onChange={onChangeDate} date={date.date} />
      </div>
      <Input value={input} color='diary' onChange={handleChangeInput} />
      <Textarea
        value={textarea}
        style={{ marginTop: "12px" }}
        onChange={handleChangeTextarea}
      />
      <div className='button-wrap'>
        <DiaryButton color='back' onClick={handleClickPrevious}>
          이전
        </DiaryButton>

        <DiaryButton color='done' onClick={handleClickSave}>
          등록
        </DiaryButton>
      </div>
    </Container>
  );
};

export default DiaryEdit;

const Container = styled.div`
  padding: 24px;

  .top-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .icon-wrap {
    display: flex;
    gap: 16px;
  }

  .button-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    gap: 8px;
  }
`;
