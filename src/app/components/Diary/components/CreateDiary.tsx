import Calender from "@/Components/Calendar/Calender";
import Input from "@/Components/Input/Input";
import Textarea from "@/Components/Textarea/Textarea";
import useChangeDateRange from "@/hook/useChangeDateRange";
import { useDiaryStore } from "@/store/diary.store";
import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { icons } from "../../../../../public/static/icons";

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
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
      <Input
        value={inputValue}
        style={{
          background: color.gray,
          border: `1px solid ${color.gray}`,
          width: "100%",
          padding: "0px 10px",
        }}
        onChange={handleChangeInput}
      />
      <Textarea
        value={textareaValue}
        style={{ width: "100%", marginTop: "12px" }}
        onChange={handleChangeTextarea}
      />
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
          onClick={handleClickPrevious}
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
          onClick={handleClickSave}
        >
          등록
        </div>
      </div>
    </Container>
  );
};

export default CreateDiary;

const Container = styled.div`
  padding: 24px;

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
