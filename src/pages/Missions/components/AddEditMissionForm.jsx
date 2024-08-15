import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeSvg from "../../../assets/close.svg";
import {
  clearMissionForm,
  createOrUpdateMission,
} from "../../../store/missionSlice";
import { fetchRobots } from "../../../store/robotSlice";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Select from "../../../components/Select";
import Tooltip from "../../../components/Tooltip";

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
      robot: robotRef?.value,
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

    if (isNaN(payload?.robot)) {
      valid = false;
      error.robot = "Select valid robot";
    } else {
      payload.robot = +payload.robot;
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
  }, [dispatch]);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-200 rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 !pb-3 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {missionForm?.isEdit ? "Update Mission" : "Add Mission"}
            </h3>
            <Tooltip text="Close">
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => dispatch(clearMissionForm())}
              >
                <img src={closeSvg} className="h-3" alt="close_button" />
              </button>
            </Tooltip>
          </div>
          <div className="p-4 md:p-5 !pt-3">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input
                  label={"Mission Name"}
                  type={"text"}
                  refer={setNameRef}
                  defaultValue={missionForm?.data?.name || ""}
                  placeholder={"Enter name"}
                  error={error?.name || ""}
                />
              </div>
              <div>
                <Textarea
                  label={"Description"}
                  refer={setDescriptionRef}
                  defaultValue={missionForm?.data?.description || ""}
                  placeholder={"Enter description"}
                  error={error?.description || ""}
                />
              </div>
              <div>
                <Select
                  label={"Robot"}
                  refer={setRobotRef}
                  defaultValue={missionForm?.data?.robot || null}
                  placeholder={" Choose a robot"}
                  error={error?.robot || ""}
                  options={robots?.data || []}
                />
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
