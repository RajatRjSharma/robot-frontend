import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarFull: false,
  notification: { active: false, message: "", type: "" },
  loader: false,
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
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = { active: false, message: "", type: "" };
    },
  },
});

export const {
  setSideBar,
  toggleSideBar,
  setLoader,
  setNotification,
  clearNotification,
} = genericSlice.actions;

export default genericSlice.reducer;
