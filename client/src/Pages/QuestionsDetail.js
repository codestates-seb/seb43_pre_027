import React, { useState } from 'react';
import AnswerCreate from '../Components/AnswerCreate';
import '../App.css';

function QuestionsDetail() {
  const [answerScore, setAnswerScore] = useState(0);
  const handleAskQuestion = () => {
    // 질문하기 경로 입력
  };

  const handleUpVote = () => {
    setAnswerScore(answerScore + 1);
  };

  const handleDownVote = () => {
    setAnswerScore(answerScore - 1);
  };

  const totalScore = answerScore;
  const totalVotes = Math.max(answerScore, 0) + Math.max(-answerScore, 0);

  return (
    <div className="question-main-wrapper">
      <div className="question-header">
        <div className="question-title">
          <h1 className="title-name">{/*{title}*/}</h1>
          <div className="ask-button-wrapper">
            <button className="ask-button" onClick={handleAskQuestion}>
              Ask Question
            </button>
          </div>
        </div>
      </div>
      <div className="question-info">
        <div className="info-timeline">
          <span className="timeline-name">Asked</span>
          <span>today{/*게시글작성시간*/}</span>
        </div>
      </div>
      <div className="question-layout">
        <div className="question-layout-left">
          <div className="vote-group">
            <button className="vote-up" onClick={handleUpVote}>
              <svg
                aria-hidden="true"
                className="svg-icon-up"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill={/*score > 0 ? '#FFB41E' :*/ '#BABFC3'}
              >
                <path d="M2 25h32L18 9 2 25Z"></path>
              </svg>
            </button>
            <div className="vote-total">{/*좋아요 총 개수*/}0</div>
            <button className="vote-down" onClick={handleDownVote}>
              <svg
                aria-hidden="true"
                className="svg-icon-down"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill={/*score < 0 ? '#FF4F4F' :*/ '#BABFC3'}
              >
                <path d="M2 11h32L18 27 2 11Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="question-layout-rigth">
          <div className="question-body">질문이요!{/*질문 내용*/}</div>
          <div className="question-answer">
            <AnswerCreate />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsDetail;
