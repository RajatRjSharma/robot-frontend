import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  missions: [],
  countM: 0,
};

export const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    incrementM: (state) => {
      state.countM += 1;
    },
    decrementM: (state) => {
      state.countM -= 1;
    },
  },
});

export const { incrementM, decrementM } = missionSlice.actions;

export default missionSlice.reducer;
