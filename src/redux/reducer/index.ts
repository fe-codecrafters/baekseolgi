import { combineReducers } from "redux";
import modalReducer from "@/redux/reducer/modalSlice";
import dateReducer from "@/redux/reducer/dateSlice";
import dataReducer from "@/redux/reducer/getDataSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  date: dateReducer,
  data: dataReducer,
  // 다른 슬라이스 리듀서들도 추가
});

export default rootReducer;
