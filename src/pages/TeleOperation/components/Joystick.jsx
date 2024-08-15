import React from "react";
import ButtonForJoystick from "../../../components/ButtonForJoystick";
import upSvg from "../../../assets/up.svg";
import downSvg from "../../../assets/down.svg";
import leftSvg from "../../../assets/left.svg";
import rightSvg from "../../../assets/right.svg";

const Joystick = ({ onMove }) => {
  return (
    <div
      className="flex flex-col gap-1 justify-center items-center absolute z-50"
      style={{ left: "50%", bottom: "0%", transform: "translate(-50%, -50%)" }}
    >
      <ButtonForJoystick
        onAction={() => {
          onMove({ x: 0, y: -20 });
        }}
        type="button"
        imageSrc={upSvg}
        name={"up"}
      />
      <div className="flex flex-row gap-8">
        <ButtonForJoystick
          onAction={() => {
            onMove({ x: -20, y: 0 });
          }}
          type="button"
          imageSrc={leftSvg}
          name={"left"}
        />
        <ButtonForJoystick
          onAction={() => {
            onMove({ x: 20, y: 0 });
          }}
          type="button"
          imageSrc={rightSvg}
          name={"right"}
        />
      </div>
      <ButtonForJoystick
        onAction={() => {
          onMove({ x: 0, y: 20 });
        }}
        type="button"
        imageSrc={downSvg}
        name={"down"}
      />
    </div>
  );
};

export default Joystick;
