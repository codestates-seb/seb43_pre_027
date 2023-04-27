import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
function AllQuestions() {
  let navigate = useNavigate();
  let [QuestionList, setQuestionList] = useState([]);
  useEffect(() => {
    axios
      .get('/questions/all-questions', {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((결과) => {
        setQuestionList(결과.data.data);
      })
      .catch(() => {
        console.log('실패함');
      });
  }, []);

  return (
    <Mainbar>
      <제목버튼묶음>
        <제목글자>All Questions</제목글자>
        <버튼
          onClick={() => {
            navigate('/ask');
          }}
        >
          Ask Question
        </버튼>
      </제목버튼묶음>

      <질문갯수>{QuestionList.length} questions</질문갯수>
      {QuestionList.map(function (data, index) {
        return (
          <질문Ul key={index}>
            <질문제목
              onClick={() => {
                navigate(`/questions/${data.questionId}`);
              }}
            >
              {data.title}
            </질문제목>
            <질문바디>{data.body}</질문바디>
            <유저네임>{data.memberNickName}</유저네임>
          </질문Ul>
        );
      })}
    </Mainbar>
  );
}

export default AllQuestions;

let Mainbar = styled.div`
  display: flex;
  flex-direction: column;
  width: 727px;
  height: 100%;
  border-left: 1px;
  padding: 24px 16px;
`;

let 제목버튼묶음 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 49.78px;
  align-items: center;
  margin-bottom: 12px;
`;

let 제목글자 = styled.div`
  font-size: 27px;
  font-weight: 600 !important;
  padding-top: 24px;
  padding-bottom: 27px;
`;

let 버튼 = styled.button`
  background-color: #2f95e2;
  border-radius: 8px;
  padding: 0.8em 1.2em 0.8em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  :hover {
    background: #0274cc;
  }
`;

let 질문갯수 = styled.div`
  font-size: 17px;
  font-weight: 600 !important;
  padding-bottom: 12px;
  border-bottom: 1px solid gray;
`;

let 질문Ul = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 16px;
  // 질문사이에 선넣기
  border-bottom: 1px solid #e3e6e8;
`;

let 질문제목 = styled.h3`
  color: #0274cc;
  font-size: 17px;
  padding-right: 24px;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
`;

let 질문바디 = styled.h3`
  font-size: 13px;
  // 3줄 넘으면 생략 시키는 css
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 5px;
`;

let 유저네임 = styled.div`
  height: 38.59px;
  //수직정렬
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;
