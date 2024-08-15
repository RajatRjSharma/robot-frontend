import PropTypes from "prop-types";

const RobotStatusCard = ({ robotDetails, robotPosition, messages }) => {
  const thirdLastMessage =
    messages.length >= 3 ? messages[messages.length - 3] : null;
  const secondLastMessage =
    messages.length >= 2 ? messages[messages.length - 2] : null;
  const lastMessage =
    messages.length >= 1 ? messages[messages.length - 1] : null;

  return (
    <div
      className="min-w-[200px] py-2 px-3 shadow-lg rounded-md my-2 cursor-pointer bg-gray-300 bg-opacity-50 flex flex-col gap-1 absolute z-50"
      style={{ right: "50px", bottom: "50px" }}
    >
      <div className="text-gray-900 font-semibold text-base border-b border-gray-300 w-full py-1 flex justify-between items-center">
        <span>Robot</span>
      </div>
      <div className="flex justify-between text-sm items-start gap-2">
        <h1 className="text-gray-900 font-semibold ">Name </h1>
        <p className="font-medium text-gray-700">
          {robotDetails?.name || "--"}
        </p>
      </div>
      <div className="flex justify-between text-sm items-start gap-2">
        <h1 className="text-gray-900  font-semibold ">Model </h1>
        <p className="font-medium text-gray-700">
          {robotDetails?.model_name || "--"}
        </p>
      </div>
      <div className="flex justify-between text-sm items-start gap-2">
        <h1 className="text-gray-900  font-semibold ">Coordinates</h1>
        <p className="font-medium text-gray-700">
          ({robotPosition?.x ?? "--"}, {robotPosition?.y ?? "--"})
        </p>
      </div>

      <div className="flex justify-start items-start gap-2 text-xs flex-col">
        {thirdLastMessage?.message && (
          <div
            className="flex justify-between items-center w-full"
            style={{ color: thirdLastMessage?.status ? "green" : "red" }}
          >
            <div>
              <h1 className=" font-semibold ">{`${messages?.length - 2} ${
                thirdLastMessage?.status ? "SUCCESS" : "FAILURE"
              }`}</h1>
            </div>
            <div>
              <p className="font-medium ">({thirdLastMessage?.message})</p>
            </div>
          </div>
        )}
        {secondLastMessage?.message && (
          <div
            className="flex justify-between items-center w-full"
            style={{ color: secondLastMessage?.status ? "green" : "red" }}
          >
            <div>
              <h1 className="font-semibold ">{`${messages?.length - 1} ${
                secondLastMessage?.status ? "SUCCESS" : "FAILURE"
              }`}</h1>
            </div>
            <div>
              <p className="font-medium ">({secondLastMessage?.message})</p>
            </div>
          </div>
        )}
        {lastMessage?.message && (
          <div
            className="flex justify-between items-center w-full"
            style={{ color: lastMessage?.status ? "green" : "red" }}
          >
            <div>
              <h1 className=" font-semibold ">{`${messages?.length} ${
                lastMessage?.status ? "SUCCESS" : "FAILURE"
              }`}</h1>
            </div>
            <div>
              <p className="font-medium ">({lastMessage?.message})</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

RobotStatusCard.propTypes = {
  robotDetails: PropTypes.shape({
    name: PropTypes.string,
    model_name: PropTypes.string,
  }),
  robotPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  messages: PropTypes.array,
};

export default RobotStatusCard;
