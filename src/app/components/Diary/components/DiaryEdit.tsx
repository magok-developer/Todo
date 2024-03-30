import React from "react";
import { Diary } from "../Diary";
import Input from "@/Components/Input/Input";
import { color } from "@/styles/color";
import Textarea from "@/Components/Textarea/Textarea";
import styled from "@emotion/styled";

type Props = {
  selectedDiary: Diary;
};

const DiaryEdit = ({ selectedDiary }: Props) => {
  return (
    <Container>
      <Input
        value={selectedDiary.title}
        style={{
          background: color.gray,
          border: `1px solid ${color.gray}`,
          width: "100%",
        }}
      />
      <Textarea
        value={selectedDiary.content}
        style={{ width: "100%", marginTop: "12px" }}
      />
    </Container>
  );
};

export default DiaryEdit;

const Container = styled.div`
  padding: 24px;
`;
