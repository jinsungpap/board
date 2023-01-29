import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { postListReducer, TypePostListReducer } from "../reducers/postList";

const rootReducer = combineReducers({
  postList: postListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export type RootReducer = { postList: TypePostListReducer };
