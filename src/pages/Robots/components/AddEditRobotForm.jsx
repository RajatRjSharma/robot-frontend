import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeSvg from "../../../assets/close.svg";
import {
  clearRobotForm,
  createOrUpdateRobot,
  fetchRobots,
} from "../../../store/robotSlice";

const AddEditRobotForm = () => {
  const dispatch = useDispatch();
  const { robotForm } = useSelector((state) => state.robot);

  const [nameRef, setNameRef] = useState(null);
  const [modelNameRef, setModelNameRef] = useState(null);
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

    setError(error);
    if (valid)
      if (robotForm?.isEdit) {
        if (robotForm?.data?.id)
          dispatch(createOrUpdateRobot(payload, robotForm?.data?.id));
      } else {
        dispatch(createOrUpdateRobot(payload));
      }
  };

  useEffect(() => {
    dispatch(fetchRobots());
  }, []);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-200 rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 !pb-3 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {robotForm?.isEdit ? "Update Robot" : "Add Robot"}
            </h3>

            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={() => dispatch(clearRobotForm())}
            >
              <img src={closeSvg} className="h-3" alt="close_button" />
            </button>
          </div>
          <div className="p-4 md:p-5 !pt-3">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Robot Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  ref={setNameRef}
                  defaultValue={robotForm?.data?.name || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  placeholder="Enter name"
                  required
                />
                {error?.name && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.name}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Model Name
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  ref={setModelNameRef}
                  defaultValue={robotForm?.data?.model_name || ""}
                  placeholder="Enter model name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  required
                />
                {error?.model_name && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.model_name}
                  </span>
                )}
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
