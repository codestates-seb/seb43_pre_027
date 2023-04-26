import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionsHeader from '../Components/Questions/QuestionsHeader';
import QuestionsBody from '../Components/Questions/QuestionsBody';
import AnswerList from '../Components/Answer/AnswerList';
import AnswerCreate from '../Components/Answer/AnswerCreate';
import axios from 'axios';

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
  const [addAnswer, setAddAnswer] = useState([]);

  // 질문 받아오는 state
  let [questionData, setQuestionData] = useState({});
  useEffect(() => {
    axios
      .get(
        // 멤버 아이디가 1대신 들어감
        '/questions/1',
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      .then((결과) => {
        console.log(결과.data);
        setQuestionData(결과.data);
      })
      .catch(() => {
        console.log('실패함');
      });
  }, []);

  //answeritem을 담을 리스트 생성
  return (
    <Container>
      {/* 질문 상세페이지 헤더 */}
      <QuestionsHeader
        title={questionData.title}
        nickName={questionData.nickName}
      />
      {/* 질문 상세페이지 본문 */}
      <QuestionsBody body={questionData.body} />
      {/* 질문 상세페이지 답변 목록 */}
      <AnswerList
        addAnswer={addAnswer}
        setAddAnswer={setAddAnswer}
        commentBodys={questionData.commentBodys}
      />
      {/* 질문 상세페이지 답변하기 */}
      <AnswerCreate addAnswer={addAnswer} setAddAnswer={setAddAnswer} />
    </Container>
  );
}

export default QuestionsDetail;
