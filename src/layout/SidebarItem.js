import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ currentPath, Icon, path, caption }) => {
  const active = currentPath === path;
  const fillValue = "#FFFFFF";
  return (
    <div>
      <li
        className={` ${
          active ? "sidebar_active rounded p-0 " : "bg-transparent"
        } mobiles:pl-0 mobiles:mb-2 mobiles:flex mobiles:justify-center  mb-2`}
      >
        <NavLink
          to={path}
          className="flex mobiles:justify-center items-center p-3"
          activeClassName={`sidebar_active rounded`}
        >
          <Icon fill={fillValue} />
          <span
            className={`pl-3 transition-colors ${
              active ? "" : ""
            } t_white mobiles:hidden`}
          >
            {caption}
          </span>
        </NavLink>
      </li>
    </div>
  );
};

export default SidebarItem;
