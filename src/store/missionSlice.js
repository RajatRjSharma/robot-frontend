import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  missions: [],
};

export const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {},
});

export const {} = missionSlice.actions;

export default missionSlice.reducer;
