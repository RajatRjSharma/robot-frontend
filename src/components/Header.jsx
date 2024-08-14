import React from "react";
import logoPng from "../assets/robot.png";
import menuSvg from "../assets/menu.svg";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../store/genericSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <div className=" border-gray-200 py-2.5 bg-gray-800 fixed w-full z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto w-full">
          <div className="flex items-center">
            <div className="w-[52px] h-full flex justify-center items-center mr-4">
              <img
                onClick={() => dispatch(toggleSideBar())}
                src={menuSvg}
                className="flex-shrink-0 w-7 h-7  transition duration-75 text-gray-400  group-hover:text-white cursor-pointer"
                alt="robot_on_mission_logo"
              />
            </div>
            <img
              src={logoPng}
              className="mr-3 h-6 sm:h-9"
              alt="robot_on_mission_logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Robot On Mission
            </span>
          </div>
          <div className="flex items-center lg:order-2">
            {/* <button
              className=" text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-400"
              onClick={() => {
               
              }}
            >
              NAME
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
