/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const AnswerWrapper = styled.div`
  width: auto;
  float: none;
  padding-top: 10px;
  h2 {
    font-weight: 400;
    padding-top: 20px;
    font-size: 1.46153846rem;
    line-height: 1.3;
    margin: 0 0 1em;
  }
  input {
    padding: 10px;
    margin: -1px 0 0;
    height: 200px;
    line-height: 1.3;
    width: 100%;
    font-size: 1.15384615rem;
    tab-size: 4;
  }
`;

const AnswerSubmit = styled.div`
  padding: 10px 0 15px 0;
  clear: both;
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  margin: calc((4px * 1) / 2 * -1);
  button {
    margin-top: 0;
    margin-bottom: 0;
    margin: calc((4px * 1) / 2);
    background-color: rgb(0, 162, 255);
    border-color: rgb(0, 162, 255);
    color: white;
    width: 13%;
    padding: 10px 10px;
  }
`;

function AnswerCreate({ addAnswer, setAddAnswer }) {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef(null);
  const onChangeInput = (e) => {
    setAnswer(e.target.value);
  };

  const onClickAddButton = () => {
    const nextAddAnswer = addAnswer.concat({
      id: addAnswer.length,
      answer,
      deleted: false,
    });
    setAddAnswer(nextAddAnswer);

    setAnswer('');
    inputRef.current.focus();
  };

  return (
    <AnswerWrapper>
      <h2>Your Answer</h2>
      <input
        type="textarea"
        name="answeritem"
        value={answer}
        ref={inputRef}
        onChange={onChangeInput}
      />
      <AnswerSubmit>
        <button type="submit" onClick={onClickAddButton}>
          Post your answer
        </button>
      </AnswerSubmit>
    </AnswerWrapper>
  );
}

export default AnswerCreate;
