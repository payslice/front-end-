import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { FaUserAlt, FaFolder } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi";
import { RiBankFill } from "react-icons/ri";

const CompanyRegSidebar = () => {
  const [currentLocation, setCurrentLoacation] = useState("/");

  const history = useHistory();

  const { location } = history;

  useEffect(() => {
    setCurrentLoacation(location.pathname);
  });

  return (
    <section className="h-screen max-h-screen relative onboarding_sidebar auth_sidebar_bg overflow-y-auto overflow-x-hidden mobiles:hidden">
      <div className="pt-16 px-16">
        <h1 className="mb-3  mobiles:px-1 mobiles:w-full ">
          <img
            src={require("../assets/svgs/payslice-logo.svg").default}
            className="w-52 mobiles:w-full mt-7"
            alt=""
          />
        </h1>
        <ul className="mt-24">
          <SidebarItem
            currentPath={currentLocation}
            Icon={FaUserAlt}
            path="/onboard/step1"
            caption="Company Information "
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={FaFolder}
            path="/onboard/step2"
            caption="Company Representative"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={HiBriefcase}
            path="/onboard/step3"
            caption="Company policy"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={RiBankFill}
            path="/onboard/step4"
            caption="Bank Details"
          />
        </ul>
      </div>

      <div
        className="absolute object-bottom"
        style={{ bottom: "0", left: "12px" }}
      >
        <img
          src={require("../assets/svgs/payslice-bg.svg").default}
          className="w-72 mobiles:hidden"
          alt=""
        />
      </div>
    </section>
  );
};

export default CompanyRegSidebar;
