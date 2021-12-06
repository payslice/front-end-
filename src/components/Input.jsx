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
}) => {
  return (
    <div className="w-full mt-5">
      <label htmlFor="" className="font-light text-normal">
        {label}
      </label>
      <input
        className="border-transparent bg-gray-100 mb-5 mt-2 w-full border-gray-400 py-3 px-5 rounded"
        type={type}
        onFocus
        placeholder={placeholder}
        name={name}
        id={id}
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
    <div className="w-full mt-5">
      <label htmlFor="" className="font-semibold text-lg">
        {label}
      </label>

      <div className="border-gray-200 bg-gray-100 border mb-5 mt-2 w-full border-gray-400 py-3 px-5 rounded flex justify-between">
        <input
          className=""
          type={type}
          onFocus
          placeholder={placeholder}
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          required={required}
        />
        <span className="cursor-pointer">
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
