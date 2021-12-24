import React, { useRef, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaUserAlt, FaFolder } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi";
import { RiBankFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

export const OnboardMobileNav = () => {
  const tdc = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    {
      path: "/onboard/step1",
      Icon: FaUserAlt,
      name: "Onboarding",
    },
    {
      path: "/onboard/step2",
      Icon: FaFolder,
      name: "Representative",
    },
    {
      path: "/onboard/step3",
      Icon: HiBriefcase,
      name: "Company policy",
    },
    {
      path: "/onboard/step4",
      Icon: RiBankFill,
      name: "Bank Details",
    },
  ];
  return (
    <div
      ref={tdc}
      //   style={{ position: "relative", left: "" }}
      className={`w-3/5 relative my-auto hidden mobiles:block pt-8  pb-5  bg-white mobiles:fixed ${
        !showMenu ? "w-full px-6" : "h-full sidebar_bg"
      }`}
    >
      {!showMenu && (
        <RiMenuLine
          style={{ fontSize: "28px" }}
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        />
      )}

      {showMenu && (
        <div className="relative h-full w-full px-4">
          <div className="mt-10">
            <img
              src={require("../assets/svgs/payslice-logo.svg").default}
              className="w-3/4 pb-12 "
              alt=""
            />
          </div>
          {menuItems?.map((item) => {
            return (
              <div className="mb__menu-item my-2 ">
                <NavLink
                  to={item.path}
                  activeClassName="sidebar_active rounded"
                  className="flex p-2"
                  onClick={() => setShowMenu(false)}
                >
                  <item.Icon fill="#FFFFFF" className="my-auto" />{" "}
                  <div className="text-white font-normal my-auto ml-3">
                    {item.name}
                  </div>
                </NavLink>
              </div>
            );
          })}
          <div
            className="absolute object-bottom flex"
            style={{ bottom: "100px", left: "12px" }}
            onClick={() => setShowMenu(false)}
          >
            <MdArrowBackIosNew fill="#FFFFFF" className="my-auto" />{" "}
            <div className="text-white my-auto ml-2">Collapse Panel</div>
          </div>
        </div>
      )}
    </div>
  );
};
