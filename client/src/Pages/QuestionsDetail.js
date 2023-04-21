import React from 'react';
import styled from 'styled-components';
import QuestionsHeader from '../Components/Questions/QuestionsHeader';
import QuestionsBody from '../Components/Questions/QuestionsBody';
import AnswerList from '../Components/Answer/AnswerList';

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
`;

function QuestionsDetail() {
  return (
    <Container>
      <QuestionsHeader />
      <QuestionsBody />
      <AnswerList />
    </Container>
  );
}

export default QuestionsDetail;
