import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const AccountInfo = () => {
  return (
    <>
      <div className="text-2xl">Account Information</div>

      <div className="bg-gray-100 flex justify-between rounded px-5 py-2">
        <div className="mr-5">Payments ID : SOP28393938h</div>
        <div className="mr-5">Month: Ocotober 2o21</div>
        <div className="mr-5">Amount: NGN 500,000</div>
        <div className="mr-5">Due Date NGN 500,000</div>
      </div>

      <div className="mt-10 border rounded border-gray-200">
        <div className="flex border-b-2 border-gray-200 px-8 py-4 justify-between">
          <div className="text-2xl">Your payslice wallet</div>
          <MdKeyboardArrowDown className="my-auto" />
        </div>
        <div className="content p-8">
          <div className="font-normal">
            Kindly Transfer into the account Below
          </div>
          <div className="info">
            <span className="font-bold ">Bank Name: </span>Access Bank
          </div>
          <div className="info">
            <span className="font-bold ">Account Name: </span>Payslice
            Limited/company name
          </div>
          <div className="info">
            <span className="font-bold ">Account Number: </span>10241838383
          </div>
        </div>
      </div>

      <div className="flex my-8 border rounded border-gray-200 px-8 py-4 justify-between">
        <div className="text-2xl">Direct Debit (add card)</div>
        <MdKeyboardArrowDown className="my-auto" />
      </div>
    </>
  );
};

export default AccountInfo;
