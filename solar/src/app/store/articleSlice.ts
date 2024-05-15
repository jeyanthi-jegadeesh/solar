
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IArticle } from '../utils/types';

interface ArticleStateType {
  isEditModeEnabled: boolean;
  currentArticle: IArticle | null;
  articleList: IArticle[]; 
  favouriteArticles: IArticle[]; 
}

const initialState:ArticleStateType = {
    isEditModeEnabled: false,
    currentArticle: null,
    articleList: [],
    favouriteArticles: []
    }

const articleSlice = createSlice({

  name: 'article',
  initialState,

  reducers: {

    toggleEditMode(state, action: PayloadAction<boolean>){
        const editMode = action.payload;
        state.isEditModeEnabled = editMode;
    },

    setCurrentArticle(state, action:PayloadAction<IArticle>) {
        const currentArticle = action?.payload;
        state.currentArticle = currentArticle;
    },

    addArticleToFavs(state, action: PayloadAction<IArticle>) {
      const newFavArticle = action.payload;
      state.favouriteArticles.push(newFavArticle);
    },

    removeArticleFromFavs(state, action: PayloadAction<IArticle>) {
      const articleToRemove = action.payload;
      state.favouriteArticles = state.favouriteArticles.filter(article => article === articleToRemove);
    }
}})

export const { toggleEditMode, setCurrentArticle, removeArticleFromFavs, addArticleToFavs } = articleSlice.actions
export default articleSlice.reducer

