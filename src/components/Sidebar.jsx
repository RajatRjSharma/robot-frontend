import React from "react";
import robotsSvg from "../assets/robots.svg";
import missionSvg from "../assets/missions.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuList = [
    {
      image: missionSvg,
      title: "Missions",
      href: "/mission",
    },
    {
      image: robotsSvg,
      title: "Robots",
      href: "/robot",
    },
  ];

  const { isSideBarFull } = useSelector((state) => state.generic);

  return (
    <aside
      id="sidebar"
      className={`${
        isSideBarFull ? "w-40" : "w-[52px]"
      } h-full duration-200 ease-in-out overflow-hidden`}
      aria-label="Sidebar"
      style={{ height: window.innerHeight - 56 + "px" }}
    >
      <nav className="h-full px-2 py-4 overflow-y-auto  bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuList?.map((_, index) => (
            <li key={index}>
              <Link
                to={_?.href || "*"}
                className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
              >
                <img
                  src={_?.image}
                  className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"
                  alt="missions_svg"
                />
                {isSideBarFull && (
                  <span className="ms-3 h-5 ">{_?.title || ""}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
