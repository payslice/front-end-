import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const InputField = ({
  type,
  placeholder,
  name,
  id,
  onChange,
  value,
  required,
  label,
  minLength,
  maxLength,
  disabled,
  readOnly,
}) => {
  return (
    <div className="w-full mt-5 mr-5">
      <label htmlFor="" className="font-light text-normal">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <input
        className="border-transparent bg-gray-100 mb-5 mt-2 w-full border-gray-400 py-3 px-5 rounded"
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        id={id}
        readOnly={readOnly}
        min={minLength}
        max={maxLength}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
};

export const PasswordInput = ({
  placeholder,
  name,
  id,
  onChange,
  value,
  required,
  label,
}) => {
  const [type, setType] = useState("password");
  return (
    <div className="mt-5">
      <label htmlFor="" className="font-light text-normal">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      <div className="border-gray-200 bg-gray-100 border mb-5 mt-2 w-full border-gray-400 rounded flex justify-between">
        <input
          className="py-3 px-5 rounded bg-gray-100 w-full"
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          required={required}
        />
        <span className="cursor-pointer bg-gray-100 py-3 px-5 ">
          {type === "password" ? (
            <AiOutlineEye onClick={() => setType("text")} />
          ) : (
            <AiOutlineEyeInvisible onClick={() => setType("password")} />
          )}
        </span>
      </div>
    </div>
  );
};
