
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ArticleStateType {
  isEditModeEnabled: boolean;
  currentArticle: Object | null; // TODO define ArticleType
  articleList: Object[]; // TODO define ArticleType
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

    setCurrentArticle(state, action: PayloadAction<Object | null>) {
        const currentArticle = action.payload;
        state.currentArticle = currentArticle;
  }
}})

export const { toggleEditMode, setCurrentArticle } = articleSlice.actions
export default articleSlice.reducer

