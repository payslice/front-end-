import React from "react";
import { BsChevronRight } from "react-icons/bs";

export const EmployeeCard = ({ gotoDetailsPage }) => {
  return (
    <div
      onClick={gotoDetailsPage}
      className="flex rounded-md my-4 p-4 justify-between"
      style={{ background: "#F3F4F6" }}
    >
      <div className="h-16 w-16 rounded-full bg-red-500 my-auto text-white">
        {" "}
        <div className="text-2xl flex justify-center items-center h-16">PM</div>
      </div>
      <div className="text">
        <div className="text-xl">Peter Brown</div>
        <p className="mb-0">
          080xxxxxxxx <span className="ml-4">Ngn 30,0000</span>
        </p>
        <p className="mb-0">peterbrown@payslice.com</p>
        <p className="mb-0">
          Pay/surge008 <span className="ml-4">Ngn 10,000</span>
        </p>
      </div>
      <BsChevronRight className="my-auto font-bold" size="20px" />
    </div>
  );
};
