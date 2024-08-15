import React, { useEffect, useRef, useState } from "react";
import Joystick from "./components/Joystick";
import Robot from "./components/Robot";

const TeleOperation = () => {
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const [boundingBox, setBoundingBox] = useState(null);

  const handleJoystickMove = ({ x, y }) => {
    setRobotPosition((prev) => {
      const newX = prev.x + x;
      const newY = prev.y + y;
      console.log(prev, newX, newY, boundingBox);
      const xGreaterThanEqualZero = newX >= 0;
      const xLessThanEqualWidth = newX <= boundingBox.width - 50;
      const yGreaterThanEqualZero = newY >= 0;
      const yLessThanEqualHeight = newY <= boundingBox.height - 50;
      if (
        xGreaterThanEqualZero &&
        xLessThanEqualWidth &&
        yGreaterThanEqualZero &&
        yLessThanEqualHeight
      )
        return { x: newX, y: newY };
      else {
        if (!xGreaterThanEqualZero) return { x: 0, y: prev.y };
        if (!xLessThanEqualWidth)
          return { x: boundingBox.width - 50, y: prev.y };
        if (!yGreaterThanEqualZero) return { x: prev.x, y: 0 };
        if (!yLessThanEqualHeight)
          return { x: prev.x, y: boundingBox.height - 50 };
      }
    });
  };

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setBoundingBox(rect);
    }
  }, [elementRef.current]);

  return (
    <div
      ref={elementRef}
      className="relative z-50 w-full h-full bg-[#f0f0f0] overflow-hidden "
    >
      <Joystick onMove={handleJoystickMove} />
      <Robot position={robotPosition} />
    </div>
  );
};

export default TeleOperation;
