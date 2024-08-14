import React from "react";
import robotsSvg from "../assets/robots.svg";
import missionSvg from "../assets/missions.svg";
import robotsActiveSvg from "../assets/robotsActive.svg";
import missionActiveSvg from "../assets/missionsActive.svg";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuList = [
    {
      image: missionSvg,
      imageActive: missionActiveSvg,
      title: "Missions",
      href: "/mission",
    },
    {
      image: robotsSvg,
      imageActive: robotsActiveSvg,
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
                className="flex items-center p-2  rounded-lg hover:bg-gray-700"
                style={{
                  backgroundColor:
                    location?.pathname === _?.href ? "#4b5563" : "",
                  color: location?.pathname === _?.href ? "#f9fafb" : "#9ca3af",
                }}
              >
                <img
                  src={
                    location?.pathname === _?.href ? _?.imageActive : _?.image
                  }
                  className="w-5 h-5  transition duration-75 "
                  alt={`${_?.title || ""}_svg`}
                />
                {isSideBarFull && (
                  <span className="ms-3 h-5">{_?.title || ""}</span>
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
