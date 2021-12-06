import React from "react";

export const CustomSelect = ({ options, label, initValue }) => {
  return (
    <div>
      <label>{label}</label>
      <div className="select-pay mb-5 mt-2">
        <select
          name="select pay option"
          className="bg-gray-100 px-5 py-4 w-full rounded "
        >
          <option value="">{initValue}</option>
          {options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
