import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  selectedContent: 'quiz' | 'article' | null;
}

const initialState: ContentState = {
  selectedContent: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSelectedContent(state, action: PayloadAction<'quiz' | 'article'>) {
      state.selectedContent = action.payload;
    },
    clearSelectedContent(state) {
      state.selectedContent = null;
    },
  },
});

export const { setSelectedContent, clearSelectedContent } = contentSlice.actions;
export default contentSlice.reducer;
