import React from 'react';
import styled from 'styled-components';

const QuestionHeader = styled.div`
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const QuestionTitle = styled.div`
  overflow-wrap: break-word;
  h1 {
    overflow-wrap: break-word;
    font-size: 2.07692308rem;
    margin-bottom: calc(8px * 1);
    flex: 1 auto;
    line-height: 1.3;
    margin: 0 0 1em;
  }
`;

const AskButton = styled.div`
  margin-left: 100%;
  display: inline-block;
  position: relative;
  button {
    background-color: rgb(0, 162, 255);
    border-color: rgb(0, 162, 255);
    color: white;
    width: 150%;
    padding: 10px 10px;
  }
`;

const QuestionInfo = styled.div`
  display: flex;
  // (수정함)
  justify-content: space-between;
  padding-bottom: calc(8px * 1);
  margin-bottom: calc(16px * 1);
  flex-wrap: wrap;
  border-color: hsl(210, 8%, 90%);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const TimeLine = styled.div`
  white-space: nowrap;
  margin-bottom: calc(8px * 1);
  margin-right: calc(16px * 1);
  span {
    color: hsl(210, 8%, 45%);
    margin-right: calc(8px * 1);
  }
`;

function QuestionsHeader({ title, nickName }) {
  const handleAskQuestion = () => {
    // 질문하기 경로 입력
  };
  return (
    <QuestionHeader>
      <QuestionTitle>
        {/* 질문의 제목 영역 */}
        <h1>{title}</h1>
        <AskButton>
          {/* 질문하기 버튼 클릭 시, 질문하기 페이지로 이동 */}
          <button onClick={handleAskQuestion}>Ask Question</button>
        </AskButton>
      </QuestionTitle>
      <QuestionInfo>
        <TimeLine>
          <span>Asked</span>
          <span>today{/* 게시글 작성 시간 */}</span>
        </TimeLine>
        {/* (수정함) */}
        <strong>{nickName}</strong>
      </QuestionInfo>
    </QuestionHeader>
  );
}

export default QuestionsHeader;
