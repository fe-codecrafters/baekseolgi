import { combineReducers } from "redux";
import modalReducer from "@/redux/reducer/modalSlice";
import dateReducer from "@/redux/reducer/dateSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  date: dateReducer,
  // 다른 슬라이스 리듀서들도 추가
});

export default rootReducer;
