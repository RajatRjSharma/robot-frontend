import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import deleteSvg from "../../../assets/delete.svg";
import { deleteRobot, fetchRobot } from "../../../store/robotSlice";
import Tooltip from "../../../components/Tooltip";

const RobotListItem = ({ robot, index, selectedRobot }) => {
  const dispatch = useDispatch();

  return (
    <li
      className="py-2 px-3 shadow-md rounded-md w-full my-2 cursor-pointer"
      onClick={() => robot?.id && dispatch(fetchRobot(robot?.id))}
      style={{
        backgroundColor:
          robot?.id === selectedRobot?.data?.id ? "#B6BAC1" : "#e5e7eb",
      }}
    >
      <div className="flex items-center gap-2 w-full">
        <div className="flex gap-2 items-center flex-1 w-full">
          <span className="text-xl font-medium text-gray-900">
            {index + 1}.
          </span>
          <span
            className="text-xl font-medium text-gray-900 break-all break-words"
            style={{
              hyphens: "auto",
            }}
          >
            {robot?.name || ""}
          </span>
        </div>
        <div className="flex items-center text-base font-semibold text-gray-900 gap-2">
          <Tooltip text="Delete">
            <button
              type="button"
              className="text-gray-900 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              onClick={() => robot?.id && dispatch(deleteRobot(robot?.id))}
            >
              <img src={deleteSvg} className="h-5" alt="delete_robot" />
            </button>
          </Tooltip>
        </div>
      </div>
    </li>
  );
};

RobotListItem.propTypes = {
  robot: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    model_name: PropTypes.string.isRequired,
    pose_x: PropTypes.number.isRequired,
    pose_y: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RobotListItem;
