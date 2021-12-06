import React from "react";

export const EmployeeInfo = ({ title, value }) => {
  return (
    <div className="content">
      <span className="font-bold">{title}</span> : <span>{value}</span>
    </div>
  );
};
