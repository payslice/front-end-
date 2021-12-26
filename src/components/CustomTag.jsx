import React from "react";

export const CustomTag = ({
  text,
  isDanger,
  isSuccess,
  isTeal,
  customClass,
}) => {
  return (
    <div
      className={`tag__custom px-3 py-2 rounded ${customClass} ${
        isDanger ? "__color-danger" : ""
      } ${isSuccess ? "__color-success" : ""} ${isTeal ? "__teal-color" : ""}`}
    >
      {text}
    </div>
  );
};
