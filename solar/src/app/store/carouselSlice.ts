//Costanza has converted redux into redux toolkit. actions.ts selectors.ts and reducers.ts are now one slice file

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, ImageContent, NewsContent } from "../utils/types";

interface InitialState {
  images: ImageContent[];
  news: NewsContent[];
}

const initialState: InitialState = {
  images: [],
  news: [],
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    addImage(state, action: PayloadAction<ImageContent>) {
      state.images.push(action.payload);
    },
    addNews(state, action: PayloadAction<NewsContent>) {
      state.news.push(action.payload);
    },
  },
});

export const { addImage, addNews } = carouselSlice.actions;

export const selectImages = (state: RootState) => state.carouselSlice.images;
export const selectNews = (state: RootState) => state.carouselSlice.news;

export default carouselSlice.reducer;
