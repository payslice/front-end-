import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { getUserDataFromStorage } from "../utils/ApiUtils";

const Navbar = () => {
  const userData = getUserDataFromStorage();
  return (
    <nav className="flex justify-between bg-white p-6 shadow items-center sticky mobiles:hidden">
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
        <MdKeyboardArrowDown className="my-auto ml-3" />
      </div>
    </nav>
  );
};

export default Navbar;
