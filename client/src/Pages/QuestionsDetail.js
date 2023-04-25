import React, { useState } from 'react';
import styled from 'styled-components';
import QuestionsHeader from '../Components/Questions/QuestionsHeader';
import QuestionsBody from '../Components/Questions/QuestionsBody';
import AnswerList from '../Components/Answer/AnswerList';
import AnswerCreate from '../Components/Answer/AnswerCreate';

const Container = styled.div`
  max-width: 1100px;
  width: calc(100% - 164px);
  background-color: hsl(0, 0%, 100%);
  border-radius: 0;
  border: 1px solid hsl(210, 8%, 85%);
  border-top-width: 0;
  border-bottom-width: 0;
  border-left-width: 1px;
  border-right-width: 0;
  padding: calc(24px * 1);
  box-sizing: border-box;
  list-style: none;
`;

function QuestionsDetail() {
  const [addAnswer, setAddAnswer] = useState([]); //answeritem을 담을 리스트 생성
  return (
    <Container>
      {/* 질문 상세페이지 헤더 */}
      <QuestionsHeader />
      {/* 질문 상세페이지 본문 */}
      <QuestionsBody />
      {/* 질문 상세페이지 답변 목록 */}
      <AnswerList addAnswer={addAnswer} setAddAnswer={setAddAnswer} />
      {/* 질문 상세페이지 답변하기 */}
      <AnswerCreate addAnswer={addAnswer} setAddAnswer={setAddAnswer} />
    </Container>
  );
}

export default QuestionsDetail;
