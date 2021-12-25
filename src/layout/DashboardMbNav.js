import React, { useRef, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaFolder } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { MdAnalytics } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";

export const DahboardMobileNav = () => {
  const tdc = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    {
      path: "/dashboard",
      Icon: AiFillHome,
      name: "Dashboard",
    },
    {
      path: "/employee",
      Icon: FaFolder,
      name: "Employees",
    },
    {
      path: "/withdrawals",
      Icon: MdAnalytics,
      name: "Withdrawals",
    },
    {
      path: "/payments",
      Icon: HiBriefcase,
      name: "Payments",
    },
    {
      path: "/support",
      Icon: FaCommentDots,
      name: "Support",
    },
    {
      path: "/settings",
      Icon: AiFillSetting,
      name: "Settings",
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
