import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div
      style={{ maxWidth: "100vw" }}
      className="h-screen max-h-screen overflow-x-hidden w-screen flex"
    >
      <Sidebar />
      <main className="h-screen mobiles:p-4 max-w-full w-full overscroll-x-hidden max-h-screen flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
