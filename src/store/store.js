import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./robotSlice";
import missionReducer from "./missionSlice";

export const store = configureStore({
  reducer: {
    robot: robotReducer,
    mission: missionReducer,
  },
});
