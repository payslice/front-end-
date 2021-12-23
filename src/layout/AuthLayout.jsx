import React from "react";
import { AuthMobileNav } from "./AuthMobileNav";
import AuthSidebar from "./AuthSidebar";

const AuthLayout = ({ children }) => {
  return (
    <div
      style={{ maxWidth: "100vw" }}
      className="h-screen max-h-screen overflow-x-hidden w-screen flex mobiles:block"
    >
      <AuthSidebar />
      <AuthMobileNav />
      <main className="h-screen mobiles:p-6 max-w-full w-full overscroll-x-hidden max-h-screen px-32 py-10 flex-1 overflow-y-auto ">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
