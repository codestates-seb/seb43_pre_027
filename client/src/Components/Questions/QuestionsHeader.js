import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const QuestionHeader = styled.div`
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    overflow-wrap: break-word;
    font-size: 2.07692308rem;
    margin-bottom: calc(8px * 1);
    flex: 1 auto;
    line-height: 1.3;
    color: hsl(210, 8%, 25%);
  }
`;

const AskButton = styled.div`
  display: inline-block;
  margin-top: 5px;
  position: relative;
  button {
    background-color: rgb(0, 162, 255);
    border-color: rgb(0, 162, 255);
    color: white;
    width: 100%;
    padding: 10px 10px;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 hsla(0, 0%, 100%, 0.4);
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
  strong {
    margin-right: calc(8px * 1);
  }
`;

function QuestionsHeader({ title, nickName }) {
  let navigator = useNavigate();
  return (
    <QuestionHeader>
      <QuestionTitle>
        {/* 질문의 제목 영역 */}
        <h1>{title}</h1>
        <AskButton>
          {/* 질문하기 버튼 클릭 시, 질문하기 페이지로 이동 */}
          <button
            onClick={() => {
              navigator('/ask');
            }}
          >
            Ask Question
          </button>
        </AskButton>
      </QuestionTitle>
      <QuestionInfo>
        <TimeLine>
          <span>Asked</span>
          <strong>today{/* 게시글 작성 시간 */}</strong>
          {/* (수정함) */}
          <strong>{nickName}</strong>
        </TimeLine>
      </QuestionInfo>
    </QuestionHeader>
  );
}

export default QuestionsHeader;
