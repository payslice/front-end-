import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AccentBar } from "./AccentBar";

export const EmployeeTab = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <div className="mobiles:flex mb-4 hidden">
      <div className="mr-3">
        <div className="text-normal" onClick={() => history.push("/employee")}>
          Employees
        </div>
        {location.pathname === "/employee" && <AccentBar />}
      </div>
      <div className="tab-2">
        <div
          className="text-normal"
          onClick={() => history.push("/employee/accepted-employee")}
        >
          Accepted Employees
        </div>
        {location.pathname === "/employee/accepted-employee" && <AccentBar />}
      </div>
    </div>
  );
};
