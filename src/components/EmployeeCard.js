import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { CustomTag } from "./CustomTag";
import OptionsMenu from "./TableOptionMenu";

export const EmployeeCard = ({ gotoDetailsPage }) => {
  return (
    <div
      onClick={gotoDetailsPage}
      className="flex rounded-md my-4 p-4 justify-between"
      style={{ background: "#F3F4F6" }}
    >
      <div className="h-14 w-14 rounded-full bg-red-500 my-auto text-white">
        {" "}
        <div className="text-2xl flex justify-center items-center h-14">PM</div>
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

export const AcceptedEmployeeCard = () => {
  const handleClick = () => {
    // console.log("clicked");
  };
  const tableOptions = [
    {
      name: "Activate",
      onClick: handleClick,
    },
    {
      name: "Stop Earning",
      onClick: handleClick,
    },
  ];
  return (
    <div
      className="flex rounded-md my-4 p-4 justify-between"
      style={{ background: "#F3F4F6" }}
    >
      <div className="h-14 w-14 rounded-full bg-red-500 my-auto text-white">
        {" "}
        <div className="text-2xl flex justify-center items-center h-14">PM</div>
      </div>
      <div className="text">
        <div className="text-xl">Peter Brown</div>
        <p className="mb-0 flex justify-between">
          080xxxxxxxx{" "}
          <span className="ml-4">
            <CustomTag
              text="On board"
              isSuccess={true}
              customClass="mobiles:px-1 mobiles:py-0"
            />{" "}
          </span>
        </p>
        <p className="mb-0">peterbrown@payslice.com</p>
        <p className="mb-0">
          Pay/surge008 <span className="ml-4">Ngn 10,000</span>
        </p>
      </div>

      <OptionsMenu options={tableOptions} customClass="" />
    </div>
  );
};
