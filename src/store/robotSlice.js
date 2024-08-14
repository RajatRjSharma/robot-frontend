import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  robots: [],
};

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {},
});

export const {} = robotSlice.actions;

export default robotSlice.reducer;
