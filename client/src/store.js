import { configureStore, createSlice } from '@reduxjs/toolkit';

let 임시질문자료 = createSlice({
  name: '임시질문자료',
  initialState: [
    {
      id: 0,
      title: '아무것도 모르겠어요!',
      body: `'0분 공부하고 5분 쉬기 이것을 반복하는 것이 가장 효율적인 공부 시간입니다
      공부를 시작 후 집중할 수 있는 시간은 일반적으로 25분~30분이라고 합니다. 공부를 시작 한 후 30분이 지나면 집중력이 떨어집니다. 그렇기 때문에 한번에 오랜시간 동안 공부를 하는 것은 효율적이지 않습니다.
      
      쉬지 않고 6시간을 공부한다고 하면 공부시작 후 30분만 효과가 있습니다. 나머지 5시간 30분은 전혀 효과가 없습니다. 신기하게도 대부분 5분만 쉬어도 쉬는 효과가 나타납니다. 쉬는 시간으로 인해 다시 공부 효율이 높아집니다.
      
      스스로에게 상을 주어라
      늦게까지 공부를 하였다면, 본인에게 상을 주세요.
      
      공부시간이 끝날 때마다 특별한 보상을 해주세요. 자신만의 충분한 휴식으로 보상해주세요. 본인이 하고 싶은 일로 보상을 하면 됩니다. 이런 과정이 반복된다면 공부시간도 점점 늘어날 것입니다.
      
      인지 vs 기억 구분하기
      공부한 내용을 인지하는 것과 기억하는 것은 차이가 있습니다. 인지한다는 것은 기억을 한다는 것이 아닙니다. 기억을 한다고 착각하는 것입니다. 공부한 내용을 기억하는 훈련이 필요합니다.
      
      숙면은 필수
      하루 8시간 잠을 자야 합니다. 충분한 잠을 자야 뇌가 더 효율적으로 정보를 저장합니다. 하루 8시간 숙면으로 효과적인 공부를 할 수 있습니다.
      
      배운 직후 복습하기
      공부가 끝난 후 정리한 노트로 바로 복습을 하여야 합니다. 몇 시간 지난 후 복습하는 것은 효과적이지 않습니다. 배운 직후 5분 이내 복습을 하세요. 기억이 훨씬 더 잘될 것입니다. 5분 정도 투자로 효과는 매우 강력합니다.
      
      남을 가르쳐라
      가르치는 것이 최고의 공부 방법입니다. 공부의 80%는 낭독이 효과적이며, 읽기는 오직 20%입니다. 남을 가르치기 위해 더 이해할 수가 있으며, 말을 함으로써 더 효과적입니다.
      
      살펴보고, 질문하고, 읽고, 낭독하고, 다시 보기
      S - Survery (살펴보기)
      Q - Question (질문하기)
      3R - Read (읽기), Recite (낭독하기), Review (다시보기)
      SQ3R. 책을 살펴보면서 질문을 해라. 뇌가 무의식적으로 그 답을 찾고 있기 때문에 나중에 이해력이 높아집니다.
      
      암기방법
      단순 암기가 아닌 암기법을 사용하여 효과적으로 기억해야 합니다. 자신만의 암기방법이 필요할 수도 있습니다.`,
      members_id: '조용주',
    },
    {
      id: 1,
      title: '모든걸알겠어요!',
      body: '코딩을 하는데 발전이 많이 많이 있는거 같습니다...',
      members_id: '강동욱',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
    {
      id: 2,
      title: '내가 왜해야하죠!',
      body: '요즘 MZ들은 말이야',
      members_id: '정유주',
    },
  ],
  reducers: {
    addQuestion: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export default configureStore({
  reducer: {
    임시질문자료: 임시질문자료.reducer,
  },
});

export let { addQuestion } = 임시질문자료.actions;
