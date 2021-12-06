import React from "react";
import "./styles.scss";

export const GreyButton = ({
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
      className={`px-6 mt-5 py-3 rounded-md bg-gray-200 ${
        fullwidth && "w-full"
      } ${
        inverted
          ? "text-gray-800 border bg-gray-200 bg-transparent"
          : "text-black "
      }`}
    >
      {loading ? "Processing..." : buttonText}
    </button>
  );
};
