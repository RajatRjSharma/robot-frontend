import React, { useEffect } from "react";
import { fetchRobots } from "../../store/robotSlice";
import { useDispatch } from "react-redux";

const Robots = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRobots());
  }, [dispatch]);

  return <div>Robots</div>;
};

export default Robots;
