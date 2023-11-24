import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "@/app/redux/reducer/modalSlice";
import dateReducer from "@/app/redux/reducer/dateSlice";
import dataReducer from "@/app/redux/reducer/getDataSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  date: dateReducer,
  data: dataReducer,
  // 다른 슬라이스 리듀서들도 추가
});

export default rootReducer;
