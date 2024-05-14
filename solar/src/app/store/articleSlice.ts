
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IArticle } from '../utils/types';

interface ArticleStateType {
  isEditModeEnabled: boolean;
  currentArticle: IArticle | null; // TODO define ArticleType
  articleList: IArticle[]; // TODO define ArticleType
}

const initialState:ArticleStateType = {
    isEditModeEnabled: false,
    currentArticle: null,
    articleList: []
    }

const articleSlice = createSlice({

  name: 'article',
  initialState,

  reducers: {

    toggleEditMode(state, action: PayloadAction<boolean>){
        const editMode = action.payload;
        state.isEditModeEnabled = editMode;
    },

    setCurrentArticle(state, action) {
        const currentArticle = action?.payload;
        state.currentArticle = currentArticle;
  }
}})

export const { toggleEditMode, setCurrentArticle } = articleSlice.actions
export default articleSlice.reducer

