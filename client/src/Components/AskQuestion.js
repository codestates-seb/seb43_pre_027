import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from './../store.js';
import { useNavigate } from 'react-router-dom';

function AskQuestion() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // 값 만들때마다 새로운 id로 만들어지게하고

  const [타이틀내용, set타이틀내용] = useState('');
  const [바디내용, set바디내용] = useState('');

  let 새로운질문 = {
    id: 3,
    title: 타이틀내용,
    body: 바디내용,
    members_id: '김제발',
  };

  return (
    <Container>
      <제목>
        <제목글자>Ask a Public quesstion</제목글자>
      </제목>
      <설명>
        <설명제목>Writing a good question</설명제목>
        <설명내용>
          You’re ready to ask a programming-related question and this form will
          help guide you through the process. Looking to ask a non-programming
          question? See the topics here to find a relevant site.
        </설명내용>
        <스탭>Steps</스탭>
        <Ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>
            Add “tags” which help surface your question to members of the
            community.
          </li>
          <li>Review your question and post it to the site.</li>
        </Ul>
      </설명>
      <TitleBox>
        <Title제목>Title</Title제목>
        <div>
          Be specific and imagine you’re asking a question to another person.
        </div>
        <Title입력
          placeholder="e.g Is there an R function for finding the index of an element in a vector?"
          type="text"
          value={타이틀내용}
          onChange={(e) => {
            set타이틀내용(e.target.value);
          }}
        ></Title입력>
      </TitleBox>
      <TitleBox>
        <Title제목>What are the details of your problem?</Title제목>
        <div>
          Describe what you tried, what you expected to happen, and what
          actually resulted. Minimum 20 characters.
        </div>
        <Body입력
          value={바디내용}
          onChange={(e) => {
            set바디내용(e.target.value);
          }}
        ></Body입력>
      </TitleBox>
      <Title버튼
        onClick={() => {
          if (바디내용.length >= 20 && 타이틀내용.length >= 5) {
            dispatch(addQuestion(새로운질문));
            set타이틀내용('');
            set바디내용('');
            navigate('/');
          }
        }}
      >
        Post your question
      </Title버튼>
      {타이틀내용.length < 5 && (
        <p style={{ color: 'red' }}>
          경고: 타이틀 내용은 5글자 이상이어야 합니다.
        </p>
      )}
      {바디내용.length < 20 && (
        <p style={{ color: 'red' }}>
          경고: 바디 내용은 20글자 이상이어야 합니다.
        </p>
      )}
    </Container>
  );
}

export default AskQuestion;

let Container = styled.div`
  padding: 0px 24px 24px 24px;
`;

let 제목 = styled.div`
  display: flex;
  align-items: center;
  width: 1216px;
  height: 130px;
`;

let 제목글자 = styled.div`
  font-size: 27px;
  font-weight: 600 !important;
  padding-top: 24px;
  padding-bottom: 27px;
`;

let 설명 = styled.div`
  background-color: #ebf4fb;
  border: 1px solid blue;
  padding: 24px;
  margin-bottom: 25px;
  border-radius: 5px;
`;

let 설명제목 = styled.div`
  font-size: 21px;
  margin-bottom: 15px;
  font-weight: 700;
`;

let 설명내용 = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;

let 스탭 = styled.div`
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 700;
`;

let Ul = styled.ul`
  list-style-type: disc;
  padding-left: 30px;
`;

let TitleBox = styled.div`
  border: 1px solid black;
  padding: 24px;
  border-radius: 5px;
  margin-bottom: 25px;
`;

let Title제목 = styled.div`
  font-size: 21px;
  font-weight: 700;
`;

let Title입력 = styled.input`
  width: 100%;
  border: 1px solid black;
  padding: 7.8px 9.1px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px 0px;
`;

let Title버튼 = styled.button`
  background-color: #0274cc;
  border-radius: 5px;
  padding: 0.8em 1.2em 0.8em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-bottom: 5px;
`;

let Body입력 = styled(Title입력)`
  width: 100%;
  border: 1px;
  padding: 7.8px 9.1px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px 0px;
  height: 200px;
`;
