import React from "react";
import robotPng from "../../../assets/robot.png";

const Robot = ({ position }) => {
  const { x, y } = position;

  const style = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  };

  return (
    <div className="flex justify-center items-center" style={style}>
      <img
        src={robotPng}
        className="cursor-pointer w-full h-full"
        alt="robot_on_mission"
      />
    </div>
  );
};

export default Robot;
