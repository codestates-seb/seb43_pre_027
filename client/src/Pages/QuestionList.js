import styled from 'styled-components';

function QuestionList() {
  let 임시질문자료 = [
    {
      id: 0,
      title: '아무것도 모르겠어요!',
      body: '코딩을 하는데 발전이 없는거같습니다...',
      userName: '조용주',
    },
    {
      id: 1,
      title: '모든걸알겠어요!',
      body: '코딩을 하는데 발전이 많이 많이 있는거 같습니다...',
      userName: '강동욱',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      userName: '정유주',
    },
  ];
  
  return (
    <div>
      <div>All Question</div>
      <div>
        <div>몇개의 질문이 있는지</div>
        <buttion>Ask Question</buttion>
      </div>
      {/* redux와 map을 이용해서 질문리스트를 뽑ㄴ */}
      {임시질문자료.map(function (data, index) {
        return (
          <div key={index}>
            <div>{data.title}</div>
            <div>{data.body}</div>
            <div>{data.userName}</div>
          </div>
        );
      })}
    </div>
  );
}

export default QuestionList;
