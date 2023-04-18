import styled from 'styled-components';
import { useSelector } from 'react-redux';

function AllQuestion() {
  let 임시질문자료 = useSelector((state) => {
    return state.임시질문자료;
  });

  return (
    <div>
      <콘테이너>
        <콘텐츠>
          <메인>
            <질문들과버튼>
              <div>All Question</div>
              <버튼>Ask Question</버튼>
            </질문들과버튼>
            <질문갯수>{임시질문자료.length} questions</질문갯수>
            {/* redux와 map을 이용해서 질문리스트를 뽑ㄴ */}
            {임시질문자료.map(function (data, index) {
              return (
                <ul key={index}>
                  <li>{data.title}</li>
                  <li>{data.body}</li>
                  <li>{data.userName}</li>
                </ul>
              );
            })}
          </메인>
        </콘텐츠>
      </콘테이너>
    </div>
  );
}

export default AllQuestion;

let 질문들과버튼 = styled.div`
  margin-bottom: 12px;
  height: 37.781px;
  background-color: green;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

let 콘테이너 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1264px;
`;

let 콘텐츠 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1100px;
`;

let 메인 = styled.div`
  width: 727px;
`;

let 버튼 = styled.button`
  width:80.216px
  height: 14.981px;
  padding: 10.4px
  margin-bottom: 12px;
  font-size: 17px;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: #0274cc;
  color: white;
  border-radius: 4px;
`;

let 질문갯수 = styled.div`
  height: 35.031px;
  background-color: blue;
  aligth
`;
