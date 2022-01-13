import React, { useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  getUserDataFromStorage,
  removeTokenFromStorage,
  removeUserDataFromStorage,
} from "../utils/ApiUtils";
import { useHistory } from "react-router";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const userData = getUserDataFromStorage();

  const tdc = useRef();
  useClickOutside(tdc, () => {
    setShow(false);
  });

  const history = useHistory();

  const handleLogout = () => {
    history.push("/login");
    removeTokenFromStorage();
    removeUserDataFromStorage();
  };
  return (
    <nav
      ref={tdc}
      className="flex justify-between bg-white p-6 shadow items-center sticky mobiles:hidden"
    >
      <div>
        <input type="text" placeholder="Type in to search" className="" />
      </div>

      <div className="flex items-center bg-gray-100 px-6 py-2 rounded">
        <img
          src={require("../assets/imgs/user-payslice.png").default}
          alt="notification"
          className="w-12 mobiles:w-10 mr-4"
        />
        <div className="text-gray-400 my-auto">
          <h3 className="text-xl text-gray-400 mb-0">{`${userData.first_name} ${userData.last_name}`}</h3>
          <p className="font-light mb-0 capitalize">
            {userData.section} account
          </p>
        </div>
        <MdKeyboardArrowDown
          className="my-auto ml-3"
          onClick={() => setShow(true)}
        />
        {show && (
          <div
            style={{ top: "80%", right: "0", textAlign: "left" }}
            className="bg-white z-10 w-44 border mr-6 border-gray-200 text-left rounded text-xs absolute "
          >
            <div
              className="hover:bg-gray-100  py-3 px-4 border-gray-200 cursor-pointer text-base"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
