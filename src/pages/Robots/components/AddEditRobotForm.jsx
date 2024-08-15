import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeSvg from "../../../assets/close.svg";
import { clearRobotForm, createOrUpdateRobot } from "../../../store/robotSlice";
import Input from "../../../components/Input";
import Tooltip from "../../../components/Tooltip";

const AddEditRobotForm = () => {
  const dispatch = useDispatch();
  const { robotForm } = useSelector((state) => state.robot);

  const [nameRef, setNameRef] = useState(null);
  const [modelNameRef, setModelNameRef] = useState(null);
  const [xCoordinateRef, setXCoordinateRef] = useState(null);
  const [yCoordinateRef, setYCoordinateRef] = useState(null);
  const [error, setError] = useState({});

  /**
   * Handle the addition/updation of new robot
   *
   * @param {*} e : Event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef?.value || "",
      model_name: modelNameRef?.value || "",
      pose_x: xCoordinateRef?.value,
      pose_y: yCoordinateRef?.value,
    };

    let valid = true;
    let error = {};

    if (!payload?.name?.trim()) {
      valid = false;
      error.name = "Enter valid name";
    }

    if (!payload?.model_name?.trim()) {
      valid = false;
      error.model_name = "Enter valid model name";
    }

    if (isNaN(payload?.pose_x)) {
      valid = false;
      error.pose_x = "Enter valid x coordinate";
    } else {
      payload.pose_x = +payload.pose_x;
    }

    if (isNaN(payload?.pose_y)) {
      valid = false;
      error.pose_y = "Enter valid y coordinate";
    } else {
      payload.pose_y = +payload.pose_y;
    }

    setError(error);
    if (valid)
      if (robotForm?.isEdit) {
        if (robotForm?.data?.id)
          dispatch(createOrUpdateRobot(payload, robotForm?.data?.id));
      } else {
        dispatch(createOrUpdateRobot(payload));
      }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-200 rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 !pb-3 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {robotForm?.isEdit ? "Update Robot" : "Add Robot"}
            </h3>
            <Tooltip text="Close">
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => dispatch(clearRobotForm())}
              >
                <img src={closeSvg} className="h-3" alt="close_button" />
              </button>
            </Tooltip>
          </div>
          <div className="p-4 md:p-5 !pt-3">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  label={"Robot Name"}
                  type={"text"}
                  refer={setNameRef}
                  defaultValue={robotForm?.data?.name || ""}
                  placeholder={"Enter name"}
                  error={error?.name || ""}
                />
              </div>
              <div>
                <Input
                  label={"Model Name"}
                  type={"text"}
                  refer={setModelNameRef}
                  defaultValue={robotForm?.data?.model_name || ""}
                  placeholder={"Enter model name"}
                  error={error?.model_name || ""}
                />
              </div>
              <div className="flex justify-between items-center gap-2">
                <Input
                  label={"X Coordinate"}
                  type={"number"}
                  refer={setXCoordinateRef}
                  defaultValue={robotForm?.data?.pose_x || ""}
                  placeholder={"Enter x coordinate"}
                  error={error?.pose_x || ""}
                />
                <Input
                  label={"Y Coordinate"}
                  type={"number"}
                  refer={setYCoordinateRef}
                  defaultValue={robotForm?.data?.pose_y || ""}
                  placeholder={"Enter y coordinate"}
                  error={error?.pose_y || ""}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {robotForm?.isEdit ? "Update Robot" : "Add Robot"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditRobotForm;
