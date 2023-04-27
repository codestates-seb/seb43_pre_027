import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

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

let 중간메뉴 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
`;

let 필터 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .filterMenu {
    border: 1px solid gray;
    padding: 9.6px;
    font-size: 12px;
    color: #525960;

    cursor: pointer;
    margin-right: -1px;
    :hover {
      background: #f8f9f9;
    }
  }
`;

let 버튼 = styled.button`
  background-color: #2f95e2;
  border-radius: 3px;
  padding: 0.7em 1em 0.7em 1em;
  transition: all ease-in-out 0.2s;
  font-size: 13px;
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
  font-weight: 400 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

let 질문박스 = styled.ul`
  display: flex;
  flex-direction: row;
  padding: 16px;
  flex-grow: 1;
  // 질문사이에 선넣기
  border-bottom: 1px solid #e3e6e8;
  font-size: 12px;
`;

let 질문stats = styled.div`
  width: 107px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 30px;
`;

let 질문content = styled.div`
  flex-grow: 1;
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
  :hover {
    color: #329dff;
  }
`;

let 질문바디 = styled.h3`
  font-size: 13px;
  // 3줄 넘으면 생략 시키는 css
  display: -webkit-box;
  -webkit-line-clamp: 2;
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

function AllQuestions() {
  let navigate = useNavigate();
  let [QuestionList, setQuestionList] = useState([]);
  useEffect(() => {
    axios
      .get('/questions/all-questions')
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
      <중간메뉴>
        <질문갯수>{QuestionList.length} questions</질문갯수>
        <필터>
          <div className="filterMenu">Newest</div>
          <div className="filterMenu">Active</div>
          <div className="filterMenu">Bountied</div>
          <div className="filterMenu">Unanswered</div>
        </필터>
      </중간메뉴>

      {QuestionList.map(function (data, index) {
        return (
          <질문박스 key={index}>
            <질문stats>
              <div>0 votes</div>
              <div>0 answers</div>
              <div>0 view</div>
            </질문stats>
            <질문content>
              <질문제목
                onClick={() => {
                  navigate(`/questions/${data.questionId}`);
                }}
              >
                {data.title}
              </질문제목>
              <질문바디>{data.body}</질문바디>
              <유저네임>{data.memberNickName}</유저네임>
            </질문content>
          </질문박스>
        );
      })}
    </Mainbar>
  );
}

export default AllQuestions;
