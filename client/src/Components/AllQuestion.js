import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
function AllQuestions() {
  let navigate = useNavigate();
  let [QuestionList, setQuestionList] = useState([]);
  // 나중에 useEffect로 데이터 뜨게하면 될듯
  // id순서대로 넣기
  // QuestionList.find((a)=>{
  //   a.id == id
  // })
  useEffect(() => {
    axios
      .get('/questions/all-questions', {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((결과) => {
        console.log(결과.data.data);
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
            // /ask 로 바뀔예정
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
            {/* 제목누르면 그 글 페이지로 이동하는거 만들예정 */}
            {/* data를 QuestionList로 바꾸어 주면된다. */}
            <질문제목>{data.title}</질문제목>
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
  background-color: #0274cc;
  border-radius: 5px;
  padding: 0.8em 1.2em 0.8em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

let 질문갯수 = styled.div`
  font-size: 17px;
  font-weight: 600 !important;
  padding-bottom: 12px;
  border-bottom: 1px solid gray;
`;

let 질문Ul = styled.ul`
  height: 126.078px;
  padding: 16px;
  // 질문사이에 선넣기
  border-bottom: 1px solid #e3e6e8;
`;

let 질문제목 = styled.h3`
  color: #0274cc;
  font-size: 17px;
  padding-right: 24px;
  margin-bottom: 5px;
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
