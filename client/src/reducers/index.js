import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducer from "./posts";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

export default rootReducer;
