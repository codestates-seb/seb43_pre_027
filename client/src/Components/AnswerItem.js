import React, { useState } from 'react';

function AnswerItem() {
  const [answerScore, setAnswerScore] = useState(0);

  const handleUpVote = () => {
    setAnswerScore(answerScore + 1);
  };

  const handleDownVote = () => {
    setAnswerScore(answerScore - 1);
  };
  return (
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
        <div className="vote-total">{/*score*/}</div>
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
  );
}

export default AnswerItem;
