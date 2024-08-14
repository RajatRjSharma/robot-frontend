import React from "react";
import logoPng from "../assets/robot.png";
import menuSvg from "../assets/menu.svg";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../store/genericSlice";
import { useLocation } from "react-router-dom";
import { setMissionForm } from "../store/missionSlice";
import { setRobotForm } from "../store/robotSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  let title = "";
  let buttonMessage = "";
  let addFunction = () => {};
  switch (location?.pathname) {
    case "/mission":
      title = "Missions";
      buttonMessage = "Add Mission";
      addFunction = setMissionForm;
      break;
    case "/robot":
      title = "Robots";
      buttonMessage = "Add Robot";
      addFunction = setRobotForm;
      break;
    default:
      title = "Robot On Mission";
  }

  return (
    <header id="header" className="h-14" aria-label="Header">
      <div className=" border-gray-200 py-2.5 bg-gray-800 fixed w-full z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto w-full">
          <div className="flex items-center">
            <div className="w-[52px] h-full flex justify-center items-center mr-4">
              <img
                onClick={() => dispatch(toggleSideBar())}
                src={menuSvg}
                className="flex-shrink-0 w-7 h-7  transition duration-75  cursor-pointer"
                alt="robot_on_mission_logo"
              />
            </div>
            <img
              src={logoPng}
              className="mr-3 h-6 sm:h-9"
              alt="robot_on_mission_logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-50">
              {title}
            </span>
          </div>
          <div className="flex items-center lg:order-2">
            {["Missions", "Robots"].includes(title) && (
              <button
                className="text-base text-gray-50 focus:ring-4 font-semibold rounded-lg px-4 lg:px-5 py-1 lg:py-1.5 mr-10 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-400"
                onClick={() => {
                  dispatch(
                    addFunction({
                      active: true,
                      isEdit: false,
                      data: null,
                    })
                  );
                }}
              >
                {buttonMessage}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
