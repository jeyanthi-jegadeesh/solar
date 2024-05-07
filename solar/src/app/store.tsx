import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
);

export default store;
