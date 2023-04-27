import { configureStore, createSlice } from '@reduxjs/toolkit';

let 질문data = createSlice({
  name: '질문data',
  initialState: {
    title: '',
    body: '',
  },
  reducers: {
    QuestionData: (state, action) => {
      state.title = action.title;
      state.body = action.body;
    },
  },
});

export default configureStore({
  reducer: {
    질문data: 질문data.reducer,
  },
});

export let { QuestionData } = 질문data.actions;
