import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
