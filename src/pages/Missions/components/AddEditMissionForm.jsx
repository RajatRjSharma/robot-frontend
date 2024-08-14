import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeSvg from "../../../assets/close.svg";
import {
  clearMissionForm,
  createOrUpdateMission,
} from "../../../store/missionSlice";
import { fetchRobots } from "../../../store/robotSlice";

const AddEditMissionForm = () => {
  const dispatch = useDispatch();
  const { missionForm } = useSelector((state) => state.mission);
  const { robots } = useSelector((state) => state.robot);

  const [nameRef, setNameRef] = useState(null);
  const [descriptionRef, setDescriptionRef] = useState(null);
  const [robotRef, setRobotRef] = useState(null);
  const [error, setError] = useState({});

  /**
   * Handle the addition/updation of new mission
   *
   * @param {*} e : Event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef?.value || "",
      description: descriptionRef?.value || "",
      robot: +(robotRef?.value || 0),
    };

    let valid = true;
    let error = {};

    if (!payload?.name?.trim()) {
      valid = false;
      error.name = "Enter valid name";
    }

    if (!payload?.description?.trim()) {
      valid = false;
      error.description = "Enter valid description";
    }

    if (Number.isNaN(payload?.robot)) {
      valid = false;
      error.robot = "Select valid robot";
    }

    setError(error);
    if (valid)
      if (missionForm?.isEdit) {
        if (missionForm?.data?.id)
          dispatch(createOrUpdateMission(payload, missionForm?.data?.id));
      } else {
        dispatch(createOrUpdateMission(payload));
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
              {missionForm?.isEdit ? "Update Mission" : "Add Mission"}
            </h3>

            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              onClick={() => dispatch(clearMissionForm())}
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
                  Mission Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  ref={setNameRef}
                  defaultValue={missionForm?.data?.name || ""}
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
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  ref={setDescriptionRef}
                  defaultValue={missionForm?.data?.description || ""}
                  placeholder="Enter description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  required
                />
                {error?.description && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.description}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="robot"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Robot
                </label>
                <select
                  name="robot"
                  id="robot"
                  ref={setRobotRef}
                  defaultValue={missionForm?.data?.robot || null}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  required
                >
                  <option value="" disabled>
                    Choose a robot
                  </option>
                  {robots?.data?.map((_, index) => (
                    <option key={_?.id || index} value={_?.id}>
                      {_.name}
                    </option>
                  ))}
                </select>
                {error?.robot && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.robot}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {missionForm?.isEdit ? "Update Mission" : "Add Mission"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditMissionForm;
