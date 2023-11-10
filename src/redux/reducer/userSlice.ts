import { createSlice } from "@reduxjs/toolkit";

export const initialDate = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialDate,
  reducers: {
    settedUser: (state, actions) => {
      const { userId } = actions.payload;
      state.userId = userId;
    },
  },
});

export const { settedUser } = userSlice.actions;
export default userSlice.reducer;
