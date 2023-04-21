import React from 'react';
import AnswerItem from './AnswerItem';
import AnswerCreate from './AnswerCreate';
import styled from 'styled-components';

const AnswerContainer = styled.div`
  width: auto;
  float: none;
  padding-top: 10px;
`;

const AnswerHeader = styled.div`
  width: 100%;
  margin-top: 10px;
  h2 {
    font-weight: 400;
    margin-bottom: 0;
    font-size: 1.46153846rem;
    line-height: 1.3;
    margin: 0 0 1em;
  }
`;

// 등록된 답변이 있다면 AnswerItem이 노출되어야하고 없으면 미노출되어야 함

function AnswerList() {
  return (
    <AnswerContainer>
      <AnswerHeader>
        {/* 답변 개수에 따라 변경 됨 */}
        <h2>Answer</h2>
      </AnswerHeader>
      <AnswerItem />
      <AnswerCreate />
    </AnswerContainer>
  );
}

export default AnswerList;
