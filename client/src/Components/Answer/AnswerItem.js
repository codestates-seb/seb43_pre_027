import React, { useState } from 'react';
import styled from 'styled-components';

const AnswerLayout = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  padding-bottom: calc(8px * 1);
  margin-bottom: calc(16px * 1);
  border-color: hsl(210, 8%, 90%);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const LayoutLeft = styled.div`
  width: auto;
  padding-right: calc(16px * 1);
  vertical-align: top;
  grid-column: 1;
`;

const VoteGroupUP = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  margin: calc((4px * 1) / 2 * -1);
  color: hsl(210, 8%, 75%);
  button {
    margin: calc((4px * 1) / 2);
    outline: initial;
    cursor: pointer;
    border: none;
    background-color: white;
  }
`;

const VoteTotal = styled.div`
  margin: calc((4px * 1) / 2);
  display: flex;
  font-size: 1.61538462rem;
  align-items: center;
  flex-direction: column;
  color: hsl(210, 8%, 45%);
  box-sizing: inherit;
`;

const VoteGroupDown = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  margin: calc((4px * 1) / 2 * -1);
  color: hsl(210, 8%, 75%);
  button {
    margin: calc((4px * 1) / 2);
    outline: initial;
    cursor: pointer;
    border: none;
    background-color: white;
  }
`;

const LayoutRigth = styled.div`
  vertical-align: top;
  padding-right: calc(16px * 1);
  grid-column: 2;
  width: auto;
  min-width: 0;
`;

const AnswerBody = styled.div`
  width: 100%;
  margin-bottom: 1.1em;
  clear: both;
  margin-top: 0;
`;

function AnswerItem() {
  const [answerScore, setAnswerScore] = useState(0);

  const handleUpVote = () => {
    setAnswerScore(answerScore + 1);
  };

  const handleDownVote = () => {
    setAnswerScore(answerScore - 1);
  };

  const totalScore = answerScore;
  const totalVotes = Math.max(answerScore, 0) + Math.max(-answerScore, 0);
  return (
    <AnswerLayout>
      <LayoutLeft>
        <VoteGroupUP>
          <button onClick={handleUpVote}>
            <svg
              aria-hidden="true"
              className="svg-icon-up"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill={totalVotes > 0 ? '#FFB41E' : '#BABFC3'}
            >
              <path d="M2 25h32L18 9 2 25Z"></path>
            </svg>
          </button>
        </VoteGroupUP>
        <VoteTotal>{totalScore}</VoteTotal>
        <VoteGroupDown>
          <button onClick={handleDownVote}>
            <svg
              aria-hidden="true"
              className="svg-icon-down"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill={totalVotes < 0 ? '#FF4F4F' : '#BABFC3'}
            >
              <path d="M2 11h32L18 27 2 11Z"></path>
            </svg>
          </button>
        </VoteGroupDown>
      </LayoutLeft>
      <LayoutRigth>
        <AnswerBody>열심히 하시면 됩니다.{/*  답변 내용 넣기 */}</AnswerBody>
      </LayoutRigth>
    </AnswerLayout>
  );
}

export default AnswerItem;
