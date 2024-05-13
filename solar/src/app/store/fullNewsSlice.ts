// fullNewsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, NewsContent } from "../utils/types";
import { NewsApiItem } from './newsApiSlice';

interface FullNewsState {
  fullNews: NewsApiItem | null;
}

const initialState: FullNewsState = {
  fullNews: null,
};

const fullNewsSlice = createSlice({
  name: "fullNews",
  initialState,
  reducers: {
    addFullNews(state, action: PayloadAction<NewsApiItem>) {
      state.fullNews = action.payload;
    },
  },
});

export const { addFullNews } = fullNewsSlice.actions;

export const selectFullNews = (state: RootState) => state.fullNews.fullNews;

export default fullNewsSlice.reducer;