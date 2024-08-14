import React, { useEffect } from "react";
import { fetchRobots } from "../../store/robotSlice";
import { useDispatch, useSelector } from "react-redux";
import RobotListItem from "./components/RobotListItem";
import RobotCard from "./components/RobotCard";
import AddEditRobotForm from "./components/AddEditRobotForm";

const Robots = () => {
  const dispatch = useDispatch();
  const { robots, robotForm } = useSelector((state) => state.robot);
  const selectedRobot = useSelector((state) => state.robot.robot);

  useEffect(() => {
    dispatch(fetchRobots());
  }, [dispatch]);

  return (
    <div className="flex w-full h-full">
      <div className="basis-[25%] h-full w-full border-r border-gray-300 shadow-md p-2 overflow-y-auto">
        <ul className="w-full mb-10">
          {robots?.data?.map((robot, index) => (
            <RobotListItem
              key={robot?.id || index}
              index={index}
              robot={robot}
              selectedRobot={selectedRobot}
            ></RobotListItem>
          ))}
        </ul>
        {!robots?.data?.length && (
          <p className="text-2xl font-medium text-gray-900 text-center mt-10">
            No robot found, Please add some.
          </p>
        )}
      </div>
      <div className="basis-[75%] h-full w-full px-[20%] overflow-y-auto flex justify-center items-center">
        {selectedRobot?.data && <RobotCard selectedRobot={selectedRobot} />}
      </div>
      {robotForm?.active && <AddEditRobotForm />}
    </div>
  );
};

export default Robots;
