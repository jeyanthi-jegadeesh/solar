import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface News {
  id: number;
  title: string;
  text: string;
}

export interface NewsState {
  news: News[],
}

const initialState: NewsState = {
  news: []
}

export const newsSlice = createSlice({
  name: 'news',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<News[]>) => {
        state.news  = action.payload;
    }
  }
})

export const {addNews} = newsSlice.actions;
export default newsSlice.reducer;