import { configureStore } from "@reduxjs/toolkit";
import robotReducer from "./robotSlice";
import missionReducer from "./missionSlice";
import genericReducer from "./genericSlice";

export const store = configureStore({
  reducer: {
    robot: robotReducer,
    mission: missionReducer,
    generic: genericReducer,
  },
});
