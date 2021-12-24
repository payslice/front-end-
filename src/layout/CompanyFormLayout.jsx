import React from "react";
import CompanyRegSidebar from "./CompanyRegSidebar";
import { OnboardMobileNav } from "./OnboardMobileNav";

const CompanyRegLayout = ({ children }) => {
  return (
    <div
      style={{ maxWidth: "100vw" }}
      className="h-screen max-h-screen overflow-x-hidden w-screen flex mobiles:block"
    >
      <CompanyRegSidebar />
      <OnboardMobileNav />
      <main className="h-screen mobiles:p-6 max-w-full w-full overscroll-x-hidden max-h-screen px-32 py-16  flex-1 overflow-y-auto mobiles:mt-20">
        {children}
      </main>
    </div>
  );
};

export default CompanyRegLayout;
