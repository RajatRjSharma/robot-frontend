import PropTypes from "prop-types";
import React from "react";

const Textarea = ({
  label,
  refer,
  defaultValue = null,
  placeholder = "Enter",
  error = "",
}) => {
  return (
    <div>
      <label
        htmlFor={label || "text"}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <textarea
        name={label || "text"}
        id={label || "text"}
        ref={refer}
        defaultValue={defaultValue || ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
        placeholder={placeholder || "Enter"}
        required
      />
      {error && <span className="text-red-500 text-sm ml-1">{error}</span>}
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  refer: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default Textarea;
