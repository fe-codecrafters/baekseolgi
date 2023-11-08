import { createSlice } from "@reduxjs/toolkit";

export const initialDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  day: new Date().getDay(),
};

const dateSlice = createSlice({
  name: "date",
  initialState: initialDate,
  reducers: {
    settedYear: (state, actions) => {
      const { year } = actions.payload;
      state.year = year;
    },
    settedMonth: (state, actions) => {
      console.log(state);
      const { month } = actions.payload;
      state.month = month;
    },
    settedDate: (state, actions) => {
      const { date } = actions.payload;
      state.date = date;
    },
  },
});

export const { settedYear, settedMonth, settedDate } = dateSlice.actions;
export default dateSlice.reducer;
