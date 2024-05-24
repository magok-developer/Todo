import Calender from "@/Components/Calendar/Calender";
import Input from "@/Components/Input/Input";
import Textarea from "@/Components/Textarea/Textarea";
import useChangeDateRange from "@/hook/useChangeDateRange";

import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { icons } from "../../../../../public/static/icons";
import useDiaryStore from "@/store/diary.store";
import DiaryButton from "@/Components/Button/DiaryButton";

const CreateDiary = () => {
  const { date, onChange: onChangeDate } = useChangeDateRange();
  const [icon, setIcon] = useState(-1);

  const {
    inputValue,
    setInputValue,
    textareaValue,
    setTextareaValue,
    setCreateVisible,
    handleClickCreate,
  } = useDiaryStore();

  const handleChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleChangeTextarea = (e: any) => {
    setTextareaValue(e.target.value);
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
    if (inputValue.trim() === "" || textareaValue.trim() === "") {
      return;
    } else {
      setCreateVisible(false);
      const formattedDate = formatDate(date.date);
      const iconSrc = icon !== -1 ? icons[icon].choice : "";
      handleClickCreate(inputValue, textareaValue, formattedDate, iconSrc);
      setInputValue("");
      setTextareaValue("");
    }
  };

  const handleClickPrevious = () => {
    setIcon(-1);
    setCreateVisible(false);
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
      <Input value={inputValue} color='diary' onChange={handleChangeInput} />
      <Textarea
        value={textareaValue}
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

export default CreateDiary;

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
