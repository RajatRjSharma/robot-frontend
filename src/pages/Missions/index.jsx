import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMissions } from "../../store/missionSlice";

const Missions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  return <div>Missions</div>;
};

export default Missions;
