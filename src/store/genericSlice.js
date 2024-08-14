import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarFull: false,
};

export const genericSlice = createSlice({
  name: "generic",
  initialState,
  reducers: {
    setSideBar: (state, action) => {
      state.isSideBarFull = action.payload || false;
    },
    toggleSideBar: (state) => {
      state.isSideBarFull = !state.isSideBarFull;
    },
  },
});

export const { setSideBar , toggleSideBar} = genericSlice.actions;

export default genericSlice.reducer;
