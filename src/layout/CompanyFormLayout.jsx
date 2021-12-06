import React from "react";
import CompanyRegSidebar from "./CompanyRegSidebar";

const CompanyRegLayout = ({ children }) => {
  return (
    <div
      style={{ maxWidth: "100vw" }}
      className="h-screen max-h-screen overflow-x-hidden w-screen flex"
    >
      <CompanyRegSidebar />
      <main className="h-screen mobiles:p-4 max-w-full w-full overscroll-x-hidden max-h-screen p-16 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default CompanyRegLayout;
