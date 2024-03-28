"use client";

import { color } from "@/styles/color";
import styled from "@emotion/styled";
import Image from "next/image";
import Todo from "./components/Todo/Todo";

export default function Home() {
  return (
    <Container>
      <Todo />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
`;
