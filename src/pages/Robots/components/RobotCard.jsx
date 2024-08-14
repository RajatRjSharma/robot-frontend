import React from "react";
import editSvg from "../../../assets/edit.svg";
import { useDispatch } from "react-redux";
import { setRobotForm } from "../../../store/robotSlice";

const RobotCard = ({ selectedRobot }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full py-2 px-3 shadow-md rounded-md my-2 cursor-pointer bg-gray-200 flex flex-col gap-1">
      <div className="text-gray-900 font-semibold text-xl border-b border-gray-300 w-full py-1 flex justify-between items-center">
        <span>Robot</span>
        <button
          type="button"
          className="mr-2 text-gray-900 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
          onClick={() =>
            dispatch(
              setRobotForm({
                active: true,
                isEdit: true,
                data: {
                  ...selectedRobot?.data,
                },
              })
            )
          }
        >
          <img src={editSvg} className="h-5" alt="edit_robot" />
        </button>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900 font-semibold basis-[100px]">Name </h1>
        <p className="font-medium text-gray-700">{selectedRobot?.data?.name}</p>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900  font-semibold basis-[100px]">Model </h1>
        <p className="font-medium text-gray-700">
          {selectedRobot?.data?.model_name}
        </p>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900  font-semibold basis-[100px]">
          Coordinates
        </h1>
        <p className="font-medium text-gray-700">
          ({selectedRobot?.data?.pose_x}, {selectedRobot?.data?.pose_y})
        </p>
      </div>
    </div>
  );
};

export default RobotCard;
