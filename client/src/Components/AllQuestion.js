import styled from 'styled-components';
import { useSelector } from 'react-redux';

function AllQuestions() {
  // let 임시질문자료 = useSelector((state) => {
  //   return state.임시질문자료;
  // });

  return (
    <Mainbar>
      <제목버튼묶음>
        <제목글자>All Questions</제목글자>
        <버튼>Ask Question</버튼>
      </제목버튼묶음>
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
