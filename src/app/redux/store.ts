"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

// 저장된 상태를 불러와서 초기 상태로 설정
const rawState =
  typeof window === "undefined" ? "{}" : localStorage.getItem("reduxState");
const persistedState = rawState ? JSON.parse(rawState) : {};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
