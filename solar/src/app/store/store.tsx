import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk';
import newsReducer from './newsSlice';
import solarSystemReducer from './solarSystemSlice';
import overlayReducer from './overlaySlice';

const rootReducer = combineReducers({
});

// const middleware = [thunk];

export const store = configureStore({
  reducer: {
    news: newsReducer,
    solarSystem: solarSystemReducer,
    overlay: overlayReducer, // Add the overlay slice to the store
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch