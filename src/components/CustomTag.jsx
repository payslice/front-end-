import React from "react";

export const CustomTag = ({
  text,
  isDanger,
  isSuccess,
  isWarning,
  isTeal,
  customClass,
}) => {
  return (
    <div
      className={`tag__custom px-3 py-2 rounded capitalize ${customClass} ${
        isDanger ? "__color-danger" : ""
      } ${isSuccess ? "__color-success" : ""} ${isTeal ? "__teal-color" : ""} ${
        isWarning ? "bg-yellow-50 text-yellow-500" : ""
      } `}
    >
      {text}
    </div>
  );
};
