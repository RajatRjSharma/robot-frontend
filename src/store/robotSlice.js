import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader, setNotification } from "./genericSlice";
import axios from "axios";
import endpoints from "../services/apis/endpoints";
import { NotificationType } from "../services/constants";

/**
 * Method will handle api call & store state update for fetching robots.
 * GET list of robots.
 */
export const fetchRobots = createAsyncThunk(
  "robot/fetchRobots",
  async (_, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const response = await axios({ url: endpoints.ROBOT, method: "GET" });
      if (response?.data?.length && response?.data[0]?.id)
        dispatch(fetchRobot(response?.data[0]?.id));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          active: true,
          message: "Failed to fetch robots.",
          type: NotificationType.ERROR,
        })
      );
      throw error;
    } finally {
      dispatch(setLoader(false));
    }
  }
);

/**
 * Method will handle api call & store state update for fetching a robot by id.
 * GET a robot by id.
 */
export const fetchRobot = createAsyncThunk(
  "robot/fetchRobot",
  async (robotID, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const response = await axios({
        url: `${endpoints.ROBOT}${robotID}/`,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          active: true,
          message: "Failed to fetch robot.",
          type: NotificationType.ERROR,
        })
      );
      throw error;
    } finally {
      dispatch(setLoader(false));
    }
  }
);

/**
 * Method will handle api call for creating or updating a robot.
 * PUT or POST based on robot update by id or create.
 */
export const createOrUpdateRobot =
  (data, robotID = 0) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const response = await axios({
        url: endpoints.ROBOT + (robotID ? `${robotID}/` : ""),
        method: robotID ? "PUT" : "POST",
        data,
      });
      dispatch(
        setNotification({
          active: true,
          message: `Robot successfully ${robotID ? "updated" : "created"}.`,
          type: NotificationType.SUCCESS,
        })
      );
      dispatch(clearRobotForm());
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          active: true,
          message: `Failed to ${robotID ? "update" : "create"} robot.`,
          type: NotificationType.ERROR,
        })
      );
      throw error;
    } finally {
      dispatch(setLoader(false));
      dispatch(fetchRobots());
    }
  };

/**
 * Method will handle api call for deleting a robot.
 * DELETE a robot by id.
 */
export const deleteRobot = (robotID) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await axios({
      url: endpoints.ROBOT + `${robotID}/`,
      method: "DELETE",
    });
    dispatch(
      setNotification({
        active: true,
        message: `Robot successfully deleted.`,
        type: NotificationType.SUCCESS,
      })
    );
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch(
      setNotification({
        active: true,
        message: `Failed to delete robot.`,
        type: NotificationType.ERROR,
      })
    );
    throw error;
  } finally {
    dispatch(setLoader(false));
    dispatch(fetchRobots());
  }
};

const initialState = {
  robots: {
    data: [],
    status: "idle",
    error: null,
  },
  robot: {
    data: null,
    status: "idle",
    error: null,
  },
  robotForm: { active: false, isEdit: false, data: null },
};

export const robotSlice = createSlice({
  name: "robot",
  initialState,
  reducers: {
    setRobotForm: (state, action) => {
      state.robotForm = action.payload;
    },
    clearRobotForm: (state) => {
      state.robotForm = { active: false, isEdit: false, data: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRobots.pending, (state) => {
        state.robots.status = "loading";
      })
      .addCase(fetchRobots.fulfilled, (state, action) => {
        state.robots.status = "success";
        state.robots.data = action.payload;
        state.robots.error = null;
      })
      .addCase(fetchRobots.rejected, (state, action) => {
        state.robots.status = "failed";
        state.robots.data = [];
        state.robots.error = action.error.message;
      })
      .addCase(fetchRobot.pending, (state) => {
        state.robot.status = "loading";
      })
      .addCase(fetchRobot.fulfilled, (state, action) => {
        state.robot.status = "success";
        state.robot.data = action.payload;
        state.robot.error = null;
      })
      .addCase(fetchRobot.rejected, (state, action) => {
        state.robot.status = "failed";
        state.robot.data = null;
        state.robot.error = action.error.message;
      });
  },
});

export const { setRobotForm, clearRobotForm } = robotSlice.actions;

export default robotSlice.reducer;
