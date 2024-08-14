import React from "react";
import robotsSvg from "../assets/robots.svg";
import missionSvg from "../assets/missions.svg";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const menuList = [
    {
      image: missionSvg,
      title: "Missions",
    },
    {
      image: robotsSvg,
      title: "Robots",
    },
  ];

  const { isSideBarFull } = useSelector((state) => state.generic);

  return (
    <>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 ${
          isSideBarFull ? "w-40" : "w-[52px]"
        } h-screen  mt-[56px] transition-max-h duration-200 ease-in-out`}
        aria-label="Sidebar"
      >
        <nav className="h-full px-2 py-4 overflow-y-auto  bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuList?.map((_) => (
              <li>
                <a
                  href="#"
                  className="flex items-center p-2  rounded-lg text-white  hover:bg-gray-700 group"
                >
                  <img
                    src={_?.image}
                    className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"
                    alt="missions_svg"
                  />
                  {isSideBarFull && (
                    <span className="ms-3">{_?.title || ""}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
