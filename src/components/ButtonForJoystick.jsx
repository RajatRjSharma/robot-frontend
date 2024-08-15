import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ButtonForJoystick = ({ onAction, type = "button", imageSrc, name }) => {
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleMouseDown = () => {
    if (intervalId) clearInterval(intervalId);
    const id = setInterval(() => {
      onAction();
    }, 250);
    setIntervalId(id);
  };

  const handleMouseUp = () => {
    if (intervalId) clearInterval(intervalId);
  };

  const handleMouseLeave = () => {
    if (intervalId) clearInterval(intervalId);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onClick={onAction}
      type={type}
      className="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
    >
      <img src={imageSrc} className="h-5 w-5 max-w-5" alt={`${name}_svg`} />
    </button>
  );
};

ButtonForJoystick.propTypes = {
  onAction: PropTypes.func.isRequired,
  type: PropTypes.string,
  imageSrc: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};

export default ButtonForJoystick;
