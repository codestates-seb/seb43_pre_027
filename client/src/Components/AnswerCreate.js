import { useState } from 'react';

function AnswerCreate() {
  return (
    <dev className="answer-wrapper">
      <h2 className="answer-title">Your Answer</h2>
      <div className="answer-form">
        <form>
          <span className="ps_box">
            <textarea className="int" />
          </span>
        </form>
      </div>
      <div className="answer-submit">
        <button className="answer-btu" type="button">
          Post your answer
        </button>
      </div>
    </dev>
  );
}

export default AnswerCreate;
