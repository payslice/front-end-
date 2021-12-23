import React, { useState } from "react";
import employerImg from "../../assets/svgs/employer.svg";
import employeesImg from "../../assets/svgs/employee.svg";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Button } from "../../components/Button/Button";
import { useHistory } from "react-router-dom";

export const ChooseUser = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();

  const handleUserRoute = () => {
    switch (selectedIndex) {
      case 1:
        history.push("/login");
        break;
      case 2:
        history.push("/user/register");
        break;
      default:
        history.push("/login");
        break;
    }
  };

  return (
    <div className=" w-4/6 flex flex-col h-full justify-center mobiles:w-full mobiles:mt-28">
      <div className="text-3xl uppercase mb-6">choose user</div>
      <p>
        Creating a more productive workforce is just few steps away <br /> Enter
        email address to continue
      </p>
      <div className="choose-user-wrapper mt-8">
        <div
          className={`rounded-md mb-10 flex w-full p-6  justify-between cursor-pointer ${
            selectedIndex === 1
              ? "bg-white border-blue-600 border"
              : "bg-gray-100"
          }`}
          onClick={() => setSelectedIndex(1)}
        >
          <div className="rounded border border-blue-300">
            <img src={employerImg} alt="" className="m-auto p-3" />
          </div>
          <div className="user-type mr-5 my-auto">
            <div className={`${selectedIndex === 1 && "text-blue-700"}`}>
              Employers
            </div>
            <p className="mb-0 text-gray-400">Access to your dashborad</p>
          </div>
          <MdOutlineKeyboardArrowRight
            className={`my-auto mr-5 text-blue-700 text-2xl ${
              selectedIndex === 1 ? "visible" : "invisible"
            }`}
          />
        </div>
        <div
          className={`rounded-md flex w-full p-6  justify-between cursor-pointer ${
            selectedIndex === 2
              ? "bg-white border-blue-600 border"
              : "bg-gray-100"
          }`}
          onClick={() => setSelectedIndex(2)}
        >
          <div className="rounded border border-blue-300">
            <img src={employeesImg} alt="" className="m-auto p-3" />
          </div>

          <div className="user-type mr-5 my-auto">
            <div className={`${selectedIndex === 2 && "text-blue-700"}`}>
              Employees
            </div>
            <p className="mb-0 text-gray-400">Access to your dashborad</p>
          </div>

          <MdOutlineKeyboardArrowRight
            className={`my-auto mr-5 text-blue-700 text-2xl ${
              selectedIndex === 2 ? "visible" : "invisible"
            }`}
          />
        </div>
      </div>
      <div className="btn flex mt-10 flex-end justify-end">
        <Button buttonText="Next" onClick={handleUserRoute} />
      </div>
    </div>
  );
};
