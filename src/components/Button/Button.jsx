import React from "react";
import "./styles.scss";

export const Button = ({
  buttonText,
  disabled,
  loading,
  onClick,
  type,
  fullwidth,
  inverted,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`px-12 py-3 rounded-md custom-btn ${fullwidth && "w-full"} ${
        inverted
          ? "text-gray-800 border border-gray-800 bg-transparent"
          : "text-white bg-gray-800 "
      }`}
    >
      {loading ? "Processing..." : buttonText}
    </button>
  );
};
