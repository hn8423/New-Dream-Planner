import { combineReducers } from "redux"; // 여러 리듀서들을 하나로 합쳐준다.
import count from "./count";
import isLogined from "./isLogined";
import lang from "./lang";
import layout from "./layout";

const rootReducer = combineReducers({
  count,
  isLogined,
  lang, // 여기에 다른 리듀서들을 더 적으면 된다!
  layout,
});

export default rootReducer; // _app.js에서 reducer로 사용된다!
