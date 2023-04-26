/* eslint-disable react/prop-types */
import React from 'react';
import AnswerItem from './AnswerItem';
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

const AnswerBodys = styled.div`
  ul {
    white-space: pre-wrap;
  }
`;

const AnswerList = ({ addAnswer, setAddAnswer }) => {
  return (
    <AnswerContainer>
      <AnswerHeader>
        <h2>Answer</h2>
      </AnswerHeader>
      <AnswerBodys>
        <ul>
          {addAnswer && // answerList가 있을때만 출력
            addAnswer.map((answerItem) => {
              if (answerItem.deleted) return null;
              return (
                <AnswerItem
                  key={answerItem.id}
                  answerItem={answerItem}
                  addAnswer={addAnswer}
                  setAddAnswer={setAddAnswer}
                />
              );
            })}
        </ul>
      </AnswerBodys>
    </AnswerContainer>
  );
};

export default AnswerList;
