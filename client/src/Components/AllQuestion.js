import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AllQuestions() {
  let navigate = useNavigate();
  let 임시질문자료 = useSelector((state) => {
    return state.임시질문자료;
  });

  // 나중에 useEffect로 데이터 뜨게하면 될듯
  // useEffect(()=>{
  // 코드 자리
  // })

  return (
    <Mainbar>
      <제목버튼묶음>
        <제목글자>All Questions</제목글자>
        <버튼
          onClick={() => {
            // /questions/ask 로 바뀔예정
            navigate('/ask');
          }}
        >
          Ask Question
        </버튼>
      </제목버튼묶음>
      {/* <button
        onClick={() => {
          axios
            .get('https://codingapple1.github.io/shop/data2.json')
            .then((결과) => {
              console.log(결과.data);
            })
            .catch(() => {
              console.log('실패함');
            });
        }}
      >
        데이터 받아오는 버튼
      </button> */}
      <질문갯수>{임시질문자료.length} questions</질문갯수>
      {임시질문자료.map(function (data, index) {
        return (
          <질문Ul key={index}>
            {/* 제목누르면 그 글 페이지로 이동하는거 만들예정 */}
            <질문제목>{data.title}</질문제목>
            <질문바디>{data.body}</질문바디>
            <유저네임>{data.members_id}</유저네임>
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
