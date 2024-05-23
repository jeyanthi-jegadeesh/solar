import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newsApiSlice";
import solarSystemReducer from "./solarSystemSlice";
import overlayReducer from "./overlaySlice";
import contentReducer from "./carouselSlice"; //Costanza imported her slice
import fullNewsReducer from "./fullNewsSlice";
import dialogReducer from "./contentSlice";
import articleReducer from "./articleSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      dialog: dialogReducer,
      news: newsReducer,
      solarSystem: solarSystemReducer,
      overlay: overlayReducer, // Add the overlay slice to the store
      content: contentReducer, //Costanza added her reducer
      fullNews: fullNewsReducer, // Included the fullNewsSlice reducer
      article: articleReducer, 
    },
  })
}
// export const store = configureStore({
//   reducer: {
//     dialog: dialogReducer,
//     news: newsReducer,
//     solarSystem: solarSystemReducer,
//     overlay: overlayReducer, // Add the overlay slice to the store
//     content: contentReducer, //Costanza added her reducer
//     fullNews: fullNewsReducer, // Included the fullNewsSlice reducer
//     article: articleReducer, 
//   },
// });

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;