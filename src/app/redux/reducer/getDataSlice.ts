import { createSlice } from "@reduxjs/toolkit";

export const initialData = {
  year: 2000,
  month: 1,
  objective: "",
  attendance: [],
};

const getDataSlice = createSlice({
  name: "data",
  initialState: initialData,
  reducers: {
    settedData: (state, actions) => {
      const { year, month, objective, attendance } = actions.payload;
      state.year = year;
      state.month = month;
      state.objective = objective;
      state.attendance = attendance;
    },
  },
});

export const { settedData } = getDataSlice.actions;
export default getDataSlice.reducer;
