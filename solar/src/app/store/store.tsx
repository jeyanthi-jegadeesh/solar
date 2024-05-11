import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // asynch actions
import newsReducer from "./newsSlice";
import solarSystemReducer from "./solarSystemSlice";
import overlayReducer from "./overlaySlice";
import contentReducer from "./carouselSlice"; //Costanza imported her slice
import fullNewsReducer from "./fullNewsSlice";

const rootReducer = combineReducers({});

const middleware = [thunk];

export const store = configureStore({
  reducer: {
    news: newsReducer,
    solarSystem: solarSystemReducer,
    overlay: overlayReducer, // Add the overlay slice to the store
    content: contentReducer, //Costanza added her reducer
    fullNews: fullNewsReducer, // Included the fullNewsSlice reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;