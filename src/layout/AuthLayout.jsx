import React from "react";
import AuthSidebar from "./AuthSidebar";

const AuthLayout = ({ children }) => {
  return (
    <div
      style={{ maxWidth: "100vw" }}
      className="h-screen max-h-screen overflow-x-hidden w-screen flex"
    >
      <AuthSidebar />
      <main className="h-screen mobiles:p-4 max-w-full w-full overscroll-x-hidden max-h-screen p-32 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
