import React from "react";
import editSvg from "../../../assets/edit.svg";
import { useDispatch } from "react-redux";
import { setMissionForm } from "../../../store/missionSlice";
import locationSvg from "../../../assets/location.svg";
import Tooltip from "../../../components/Tooltip";
import { useNavigate } from "react-router-dom";
import { setSideBar } from "../../../store/genericSlice";

const MissionCard = ({ selectedMission }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="w-full py-2 px-3 shadow-md rounded-md my-2 cursor-pointer bg-gray-200 flex flex-col gap-1">
      <div className="text-gray-900 font-semibold text-xl border-b border-gray-300 w-full py-1 flex justify-between items-center">
        <span>Mission</span>
        <Tooltip text="Edit">
          <button
            type="button"
            className="mr-2 text-gray-900 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
            onClick={() =>
              dispatch(
                setMissionForm({
                  active: true,
                  isEdit: true,
                  data: {
                    ...selectedMission?.data,
                    robot: selectedMission?.data?.robot?.id || 0,
                  },
                })
              )
            }
          >
            <img src={editSvg} className="h-5" alt="edit_mission" />
          </button>
        </Tooltip>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900 font-semibold basis-[100px]">Name </h1>
        <p className="font-medium text-gray-800">
          {selectedMission?.data?.name}
        </p>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900  font-semibold inline basis-[100px]">
          Description
        </h1>
        <p
          className="font-medium text-gray-700 break-all break-words"
          style={{
            hyphens: "auto",
          }}
        >
          {selectedMission?.data?.description}
        </p>
      </div>
      <div className="text-gray-900 font-semibold text-xl border-b border-gray-300 w-full py-1 mt-2 flex items-center">
        Robot On Mission
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900 font-semibold basis-[100px]">Name </h1>
        <p className="font-medium text-gray-700">
          {selectedMission?.data?.robot?.name}
        </p>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900  font-semibold basis-[100px]">Model </h1>
        <p className="font-medium text-gray-700">
          {selectedMission?.data?.robot?.model_name}
        </p>
      </div>
      <div className="flex justify-start text-lg items-start gap-2">
        <h1 className="text-gray-900  font-semibold basis-[100px]">
          Coordinates
        </h1>
        <p className="font-medium text-gray-700">
          ({selectedMission?.data?.robot?.pose_x},{" "}
          {selectedMission?.data?.robot?.pose_y})
        </p>
        <Tooltip text="Teleoperate">
          <button
            type="button"
            className="text-gray-900 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-full text-sm p-1 text-center inline-flex items-center"
            onClick={() =>
              selectedMission?.data?.robot?.id &&
              dispatch(setSideBar(false)) &&
              navigate(`/teleoperate/${selectedMission?.data?.robot?.id}`)
            }
          >
            <img src={locationSvg} className="h-5" alt="tele_operate_svg" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MissionCard;
