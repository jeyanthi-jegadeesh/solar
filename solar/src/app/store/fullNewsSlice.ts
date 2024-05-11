// fullNewsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, NewsContent } from "../utils/types";

interface FullNewsState {
  fullNews: NewsContent[];
}

const initialState: FullNewsState = {
  fullNews: [],
};

const fullNewsSlice = createSlice({
  name: "fullNews",
  initialState,
  reducers: {
    addFullNews(state, action: PayloadAction<NewsContent>) {
      state.fullNews.push(action.payload);
    },
  },
});

export const { addFullNews } = fullNewsSlice.actions;

export const selectFullNews = (state: RootState) => state.fullNews.fullNews;

export default fullNewsSlice.reducer;