import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BackButton } from "../../components/BackButton";
import { generatePaymentCode } from "../../utils/ApiRequests";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const AccountInfo = () => {
  const [paymentCode, setPaymentCode] = useState();
  useEffect(() => {
    const getPaymentCode = async () => {
      try {
        const res = await generatePaymentCode();
        setPaymentCode(res.data.payload.data);
      } catch (error) {
        console.log("error", error);
        toast.error("Cannot get transaction narration code");
      }
    };
    getPaymentCode();
  }, []);

  const accountInfo = {
    accountName: "Sterling Bank",
    bankName: "Payslice Limited",
    accountNumber: "0086269848",
  };

  return (
    <>
      <BackButton />
      <div className="text-2xl mb-10">Account Information</div>

      <div className="bg-gray-100 flex justify-between w-max rounded px-5 py-2">
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
        <div className="content p-8 flex justify-between">
          <div>
            <div className="font-normal">
              Kindly Transfer into the account Below
            </div>
            <div className="info">
              <span className="font-bold ">Bank Name: </span>
              {accountInfo.bankName}
            </div>
            <div className="info">
              <span className="font-bold ">Account Name: </span>
              {accountInfo.accountName}
            </div>
            <div className="info">
              <span className="font-bold ">Account Number: </span>
              {accountInfo.accountNumber}
              <CopyToClipboard
                text={accountInfo.accountNumber}
                onCopy={() => toast.success("copied")}
              >
                <span className="bg-gray-100 p-1 cursor-pointer mx-3 rounded">
                  Copy{" "}
                </span>
              </CopyToClipboard>
            </div>
          </div>
          <div className="w-1/2">
            <div className="font-normal text-red-500 mb-3">
              N.B use code as your narration during transfer
            </div>
            <div className="border px-4 py-2 rounded w-max">{paymentCode}</div>
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
