import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Team from "../assets/svgs/Team";
import Settings from "../assets/svgs/Settings";
import Logout from "../assets/svgs/Logout";
import Contact from "../assets/svgs/Contact";
import SidebarItem from "./SidebarItem.js";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { HiBriefcase } from "react-icons/hi";
import { FaCommentDots } from "react-icons/fa";

const Sidebar = () => {
  const [currentLocation, setCurrentLoacation] = useState("/");

  const history = useHistory();

  const { location } = history;

  useEffect(() => {
    setCurrentLoacation(location.pathname);
  });

  return (
    <section className="h-screen max-h-screen sidebar sidebar_bg pt-8 overflow-y-auto overflow-x-hidden mobiles:hidden">
      <h1 className="mb-3 mobiles:px-1 mobiles:w-full pl-8">
        <img
          src={require("../assets/svgs/payslice-logo.svg").default}
          className="w-52 mobiles:w-full"
          alt=""
        />
      </h1>
      <div className="mt-16">
        <ul className="pl-8 mt-10">
          <SidebarItem
            currentPath={currentLocation}
            Icon={AiFillHome}
            path="/dashboard"
            caption="Dashboard"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={FaFolder}
            path="/employee"
            caption="Employees"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={MdAnalytics}
            path="/withdrawals"
            caption="Withdrawals"
          />

          <div className="border-white border-b-2 w-10"></div>
          <SidebarItem
            currentPath={currentLocation}
            Icon={HiBriefcase}
            path="/payments"
            caption="Payments"
          />
          <div className="border-white border-b-2 w-10"></div>
          <SidebarItem
            currentPath={currentLocation}
            Icon={FaCommentDots}
            path="/support"
            caption="Support"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={AiFillSetting}
            path="/settings"
            caption="Settings"
          />
        </ul>
      </div>
      {/* <div className="mt-8">
        <h6 className="mt-6 mobiles:px-2 mb-6 t_black font-bold small_mobile_text pl-8">
          General
        </h6>
        <ul className="pl-8">
          <SidebarItem
            currentPath={currentLocation}
            Icon={Settings}
            path="/settings"
            caption="Settings"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={Team}
            path="/team"
            caption="Team"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={Contact}
            path="/contact"
            caption="Contact"
          />
          <SidebarItem
            currentPath={currentLocation}
            Icon={Logout}
            path="/logout"
            caption="Logout"
          />
        </ul>
      </div> */}
    </section>
  );
};

export default Sidebar;
