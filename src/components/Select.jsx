import React from "react";

export const CustomSelect = ({ options, label, initValue, onChange, name }) => {
  return (
    <div>
      <label>{label}</label>
      <div className="select-pay mb-5 mt-2">
        <select
          name={name}
          className="bg-gray-100 px-5 py-4 w-full rounded "
          onChange={onChange}
        >
          <option value="">{initValue}</option>
          {options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
