import PropTypes from "prop-types";
import React from "react";

const Select = ({
  label,
  refer,
  defaultValue = null,
  placeholder = "Choose a option",
  error = "",
  options = [],
}) => {
  return (
    <div>
      <label
        htmlFor={label || "select"}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <select
        name={label || "select"}
        id={label || "select"}
        ref={refer}
        defaultValue={defaultValue}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((_, index) => (
          <option key={_?.id || index} value={_?.id}>
            {_?.name}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm ml-1">{error}</span>}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  refer: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
