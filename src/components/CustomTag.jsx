import React from "react";

export const CustomTag = ({ text, isDanger, isSuccess }) => {
  return (
    <div
      className={`tag__custom px-3 py-2 rounded ${
        isDanger ? "__color-danger" : ""
      } ${isSuccess ? "__color-success" : ""}`}
    >
      {text}
    </div>
  );
};
