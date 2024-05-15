import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const url = 'https://api.spaceflightnewsapi.net/v4/articles/';

export interface NewsApiItem {
    id: number,
    title: string,
    url: string,
    summary: string
}

export interface NewsApiState {
    news: NewsApiItem[]
}

const initialState: NewsApiState = {
    news: []
}

export const fetchData = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    const apiNews = jsonData.results;
    return apiNews;
  };

export const newsApiSlice = createSlice({
    name: 'newsApi',
    initialState,
    reducers: {
        addApiNews: (state, action: PayloadAction<NewsApiItem[]>) => {
            state.news = action.payload;
        }
    }
})

export const { addApiNews } = newsApiSlice.actions;
export default newsApiSlice.reducer;
