import { configureStore, createSlice } from '@reduxjs/toolkit';

let 임시질문자료 = createSlice({
  name: '임시질문자료',
  initialState: [
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
