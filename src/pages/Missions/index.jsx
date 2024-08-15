import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMissions } from "../../store/missionSlice";
import MissionListItem from "./components/MissionListItem";
import AddEditMissionForm from "./components/AddEditMissionForm";
import MissionCard from "./components/MissionCard";
import { fetchRobots } from "../../store/robotSlice";

const Missions = () => {
  const dispatch = useDispatch();
  const { missions, missionForm } = useSelector((state) => state.mission);
  const selectedMission = useSelector((state) => state.mission.mission);

  useEffect(() => {
    dispatch(fetchMissions());
    dispatch(fetchRobots());
  }, [dispatch]);

  return (
    <div className="flex w-full h-full">
      <div className="basis-[25%] h-full w-full border-r border-gray-300 shadow-md p-2 overflow-y-auto">
        <ul className="w-full mb-10">
          {missions?.data?.map((mission, index) => (
            <MissionListItem
              key={mission?.id || index}
              index={index}
              mission={mission}
              selectedMission={selectedMission}
            ></MissionListItem>
          ))}
        </ul>
        {!missions?.data?.length && (
          <p className="text-2xl font-medium text-gray-900 text-center mt-10">
            No mission found, Please add some.
          </p>
        )}
      </div>
      <div className="basis-[75%] h-full w-full px-[15%] overflow-y-auto flex justify-center items-center">
        {selectedMission?.data && (
          <MissionCard selectedMission={selectedMission} />
        )}
      </div>
      {missionForm?.active && <AddEditMissionForm />}
    </div>
  );
};

export default Missions;
