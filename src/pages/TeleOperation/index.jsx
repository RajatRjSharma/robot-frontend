import { useEffect, useRef, useState } from "react";
import Joystick from "./components/Joystick";
import Robot from "./components/Robot";
import { useParams } from "react-router-dom";
import endpoints from "../../services/apis/endpoints";
import useWebSocket from "./websocket/useWebSocket";
import { useDispatch } from "react-redux";
import { setLoader, setNotification } from "../../store/genericSlice";
import { NotificationType } from "../../services/constants";
import RobotStatusCard from "./components/RobotStatusCard";

const TeleOperation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [robotDetails, setRobotDetails] = useState(null);
  const boundaryElementRef = useRef(null);
  const [boundaryBoundingBox, setBoundaryBoundingBox] = useState(null);
  const { messages, isConnected, sendMessage } = useWebSocket(
    `${WEBSOCKET_URL}${endpoints.TELEOPERATE}${id}/`
  );

  /**
   * Method will handle the movement of robot, but taking the change
   * in x or y coordinate and validating for boundary condition, then
   * sending as a json update through web socket and update local state.
   * @param {*} {x,y} Value of change in x or y coordinate.
   */
  const handleJoystickMove = ({ x, y }) => {
    if (isConnected === "YES")
      setRobotPosition((prev) => {
        const newX = prev.x + x;
        const newY = prev.y + y;
        const xGreaterThanEqualZero = newX >= 0;
        const xLessThanEqualWidth = newX <= boundaryBoundingBox.width - 40;
        const yGreaterThanEqualZero = newY >= 0;
        const yLessThanEqualHeight = newY <= boundaryBoundingBox.height - 40;
        let newCoordinates = { ...prev };
        if (
          xGreaterThanEqualZero &&
          xLessThanEqualWidth &&
          yGreaterThanEqualZero &&
          yLessThanEqualHeight
        )
          newCoordinates = { x: newX, y: newY };
        else {
          if (!xGreaterThanEqualZero) newCoordinates = { x: 0, y: prev.y };
          else if (!xLessThanEqualWidth)
            newCoordinates = { x: boundaryBoundingBox.width - 40, y: prev.y };

          if (!yGreaterThanEqualZero)
            newCoordinates = { x: newCoordinates.x, y: 0 };
          else if (!yLessThanEqualHeight)
            newCoordinates = {
              x: newCoordinates.x,
              y: boundaryBoundingBox.height - 40,
            };
        }
        if (newCoordinates.x !== prev.x || newCoordinates.y !== prev.y)
          sendMessage({ pose_x: newCoordinates.x, pose_y: newCoordinates.y });
        return newCoordinates;
      });
    else {
      switch (isConnected) {
        case "NO":
          dispatch(setLoader(true));
          dispatch(
            setNotification({
              active: true,
              message: "Cannot move, Robot not yet connected",
              type: NotificationType.ERROR,
            })
          );
          break;
        case "ERROR":
          dispatch(setLoader(false));
          dispatch(
            setNotification({
              active: true,
              message: "Cannot move, Robot failed to connect",
              type: NotificationType.ERROR,
            })
          );
          break;
        case "ERROR_DATA":
          dispatch(setLoader(false));
          dispatch(
            setNotification({
              active: true,
              message: "Cannot move, Invalid data passed",
              type: NotificationType.ERROR,
            })
          );
          break;
      }
    }
  };

  useEffect(() => {
    if (boundaryElementRef.current) {
      const rect = boundaryElementRef.current.getBoundingClientRect();
      setBoundaryBoundingBox(rect);
    }
  }, [boundaryElementRef.current?.offsetWidth]);

  useEffect(() => {
    if (messages.length) {
      const message = messages.at(-1);
      if (message?.name && message?.model_name) {
        handleJoystickMove({ x: message?.pose_x, y: message?.pose_y });
        setRobotDetails({
          name: message?.name,
          model_name: message?.model_name,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    switch (isConnected) {
      case "YES":
        dispatch(setLoader(false));
        dispatch(
          setNotification({
            active: true,
            message: "Robot connected",
            type: NotificationType.SUCCESS,
          })
        );
        break;
      case "NO":
        dispatch(setLoader(true));
        dispatch(
          setNotification({
            active: true,
            message: "Robot not yet connected",
            type: NotificationType.INFO,
          })
        );
        break;
      case "ERROR":
        dispatch(setLoader(false));
        dispatch(
          setNotification({
            active: true,
            message: "Robot failed to connect",
            type: NotificationType.ERROR,
          })
        );
        break;
    }
  }, [isConnected, dispatch]);

  return (
    <div
      ref={boundaryElementRef}
      className="relative w-full h-full bg-[#f0f0f0] overflow-hidden ground"
    >
      <Joystick onMove={handleJoystickMove} />
      <Robot position={robotPosition} />
      <RobotStatusCard
        robotDetails={robotDetails}
        robotPosition={robotPosition}
        messages={messages}
      />
    </div>
  );
};

export default TeleOperation;
