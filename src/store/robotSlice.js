import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  robots: [],
  countR: 0,
};

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    incrementR: (state) => {
      state.countR += 1;
    },
    decrementR: (state) => {
      state.countR -= 1;
    },
  },
});

export const { incrementR, decrementR } = robotSlice.actions;

export default robotSlice.reducer;
