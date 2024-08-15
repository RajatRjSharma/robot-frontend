import React from "react";

const Robot = ({ position }) => {
  const { x, y } = position;

  console.log(x,y)

  const style = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: "50px",
    height: "50px",
    backgroundColor: "blue",
    borderRadius: "50%",
  };

  return <div style={style} />;
};

export default Robot;
