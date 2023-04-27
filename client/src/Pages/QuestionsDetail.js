import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuestionsHeader from '../Components/Questions/QuestionsHeader';
import QuestionsBody from '../Components/Questions/QuestionsBody';
import AnswerList from '../Components/Answer/AnswerList';
import AnswerCreate from '../Components/Answer/AnswerCreate';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import { useNavigate, useParams } from 'react-router-dom';

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
  padding-top: 20px;
`;
const CommonLayout = styled.main`
  width: 100%;
  max-width: 1264px;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  justify-content: space-between;
`;

const LeftAside = styled.aside`
  position: sticky;
  top: 50px;
  height: 100%;
  min-width: 164px;
  padding-top: 24px;
  margin-bottom: 8px;
`;

const RightAside = styled.aside`
  height: 100%;
  display: block;
  margin-top: 30px;
  padding-right: 24px;
  ul {
    width: 300px;
    padding: 0;
    display: block;
    text-align: left;
    align-items: center;
    height: auto;
    background-color: hsl(47, 87%, 94%);
    border-radius: 3px;
    border: 1px solid hsl(47, 65%, 84%);
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
    > li {
      width: 100%;
      padding: 0 15px;
      margin: 12px 0;
      font-size: 13px;
      list-style-type: disc;
      list-style-position: inside;
    }
    .widget-header {
      width: 100%;
      height: 41px;
      padding: 15px;
      font-weight: 700;
      font-size: 12px;
      background-color: hsl(47, 83%, 91%);
      border-bottom: 1px solid hsl(47, 65%, 84%);
      list-style-type: none;
      margin: 0;
    }
    .widget-header:nth-child(4) {
      border-top: 1px solid hsl(47, 65%, 84%);
    }
  }
`;

function QuestionsDetail() {
  const [addAnswer, setAddAnswer] = useState([]);
  let { id } = useParams();
  let [questionData, setQuestionData] = useState({});
  let navigator = useNavigate();
  useEffect(() => {
    axios
      .get(
        'http://ec2-13-125-207-209.ap-northeast-2.compute.amazonaws.com/questions/' +
          id,
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
    <>
      <Header />

      <CommonLayout>
        <LeftAside>
          <Nav />
        </LeftAside>
        <Container>
          {/* 질문 상세페이지 헤더 */}
          <QuestionsHeader
            title={questionData.title}
            nickName={questionData.nickName}
          />

          {/* 질문 상세페이지 본문 */}
          <QuestionsBody body={questionData.body} />
          {/* 질문 상세페이지 답변 목록 */}
          <button
            onClick={() => {
              navigator('edite');
            }}
          >
            수정하기
          </button>
          <AnswerList
            addAnswer={addAnswer}
            setAddAnswer={setAddAnswer}
            commentBodys={questionData.commentBodys}
          />
          {/* 질문 상세페이지 답변하기 */}
          <AnswerCreate addAnswer={addAnswer} setAddAnswer={setAddAnswer} />
        </Container>

        <RightAside>
          <ul>
            <li className="widget-header">The Overflow Blog</li>
            <li>
              A flight simulator for developers to practice real world
              challenges and...
            </li>
            <li>
              Goodbye Webpack, hello Turbopack! The big news from today’s
              Next.JS conference
            </li>
            <li className="widget-header">Featured on Meta</li>
            <li>The 2022 Community-a-thon has begun!</li>
            <li>Mobile app infrastructure being decommissioned</li>
            <li>Staging Ground Workflow: Canned Comments</li>
            <li>The Ask Wizard (2022) has graduated</li>
          </ul>
        </RightAside>
      </CommonLayout>
      <Footer />
    </>
  );
}

export default QuestionsDetail;
