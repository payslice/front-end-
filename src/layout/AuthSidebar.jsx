import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Balances from "../assets/svgs/balances.js";
import Analytics from "../assets/svgs/Analytics";
import Customers from "../assets/svgs/Customers";
import Wallet from "../assets/svgs/Wallet";
import Team from "../assets/svgs/Team";
import Settings from "../assets/svgs/Settings";
import Logout from "../assets/svgs/Logout";
import Contact from "../assets/svgs/Contact";
import SidebarItem from "./SidebarItem.js";
// import { ReactComponent as Balances } from "./../assets/svgs/balances.svg";

const AuthSidebar = () => {
  const [currentLocation, setCurrentLoacation] = useState("/");

  const history = useHistory();

  const { location } = history;

  useEffect(() => {
    setCurrentLoacation(location.pathname);
  });

  return (
    <section className="h-screen max-h-screen relative auth_sidebar auth_sidebar_bg  overflow-y-auto overflow-x-hidden">
      <div className="pt-24 px-16">
        <h1 className="mb-3 mobiles:px-1 mobiles:w-full ">
          <img
            src={require("../assets/svgs/payslice-logo.svg").default}
            className="w-52 mobiles:w-full"
            alt=""
          />
        </h1>
        <h3 className="text-3xl mt-16 font-bold text-white">
          We are revolutionizing <br /> the way people are paid.
        </h3>

        <div className="px-6 py-3 text-xl font-bold w-min uppercase text-white mt-6 mb-10 sidebar-forever">
          forever
        </div>

        <div className="text-white text-base mt-12">
          <p>
            Payslice allows employees to take a portion of their earned pay, via
            our app before the end of the month, “It’s not a loan, it’s a new
            practical way on the old payments cycle”
          </p>
        </div>
      </div>

      <div
        className="absolute object-bottom"
        style={{ bottom: "0", left: "12px" }}
      >
        <img
          src={require("../assets/svgs/payslice-bg.svg").default}
          className="w-72 mobiles:w-full"
          alt=""
        />
      </div>
    </section>
  );
};

export default AuthSidebar;
