import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader, setNotification } from "./genericSlice";
import axios from "axios";
import endpoints from "../services/apis/endpoints";
import { NotificationType } from "../services/constants";

export const fetchMissions = createAsyncThunk(
  "mission/fetchMissions",
  async (_, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const response = await axios({ url: endpoints.MISSION, method: "GET" });
      if (response?.data?.length && response?.data[0]?.id)
        dispatch(fetchMission(response?.data[0]?.id));
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          active: true,
          message: "Failed to fetch missions.",
          type: NotificationType.ERROR,
        })
      );
      throw error;
    } finally {
      dispatch(setLoader(false));
    }
  }
);

export const fetchMission = createAsyncThunk(
  "mission/fetchMission",
  async (missionID, { dispatch }) => {
    dispatch(setLoader(true));
    try {
      const response = await axios({
        url: `${endpoints.MISSION}${missionID}/`,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          active: true,
          message: "Failed to fetch mission.",
          type: NotificationType.ERROR,
        })
      );
      throw error;
    } finally {
      dispatch(setLoader(false));
    }
  }
);

export const createOrUpdateMission =
  (data, missionID = 0) =>
  async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const response = await axios({
        url: endpoints.MISSION + (missionID ? `${missionID}/` : ""),
        method: missionID ? "PUT" : "POST",
        data,
      });
      dispatch(
        setNotification({
          active: true,
          message: `Mission successfully ${missionID ? "updated" : "created"}.`,
          type: NotificationType.SUCCESS,
        })
      );
      dispatch(clearMissionForm());
      return response.data;
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({
          active: true,
          message: `Failed to ${missionID ? "update" : "create"} mission.`,
          type: NotificationType.ERROR,
        })
      );
      throw error;
    } finally {
      dispatch(setLoader(false));
      dispatch(fetchMissions());
    }
  };

export const deleteMission = (missionID) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await axios({
      url: endpoints.MISSION + `${missionID}/`,
      method: "DELETE",
    });
    dispatch(
      setNotification({
        active: true,
        message: `Mission successfully deleted.`,
        type: NotificationType.SUCCESS,
      })
    );
    return response.data;
  } catch (error) {
    console.error(error);
    dispatch(
      setNotification({
        active: true,
        message: `Failed to delete mission.`,
        type: NotificationType.ERROR,
      })
    );
    throw error;
  } finally {
    dispatch(setLoader(false));
    dispatch(fetchMissions());
  }
};

const initialState = {
  missions: {
    data: [],
    status: "idle",
    error: null,
  },
  mission: {
    data: null,
    status: "idle",
    error: null,
  },
  missionForm: { active: false, isEdit: false, data: null },
};

export const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    setMissionForm: (state, action) => {
      state.missionForm = action.payload;
    },
    clearMissionForm: (state) => {
      state.missionForm = { active: false, isEdit: false, data: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.missions.status = "loading";
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.missions.status = "success";
        state.missions.data = action.payload;
        state.missions.error = null;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.missions.status = "failed";
        state.missions.data = [];
        state.missions.error = action.error.message;
      })
      .addCase(fetchMission.pending, (state) => {
        state.mission.status = "loading";
      })
      .addCase(fetchMission.fulfilled, (state, action) => {
        state.mission.status = "success";
        state.mission.data = action.payload;
        state.mission.error = null;
      })
      .addCase(fetchMission.rejected, (state, action) => {
        state.mission.status = "failed";
        state.mission.data = null;
        state.mission.error = action.error.message;
      });
  },
});

export const { setMissionForm, clearMissionForm } = missionSlice.actions;

export default missionSlice.reducer;
