import React from "react";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";

const WithdrawFunds = () => {
  return (
    <div className="w-full mt-10 flex justify-center ">
      <div>
        <div className="text-2xl">Withdraw funds</div>
        <p>
          Please note that funds will be sent to your bank account <br />
          currently linked with your Payslice wallet or account.{" "}
        </p>
        <InputField type="text" placeholder="Enter amount" />

        <p>Serivce Charge: 750</p>
        <p>Minimum amount is NGN5000 and max amount is NGN 4000</p>
        <p>this takes between 24 - 48 hours </p>
        <Button buttonText="Withdraw Funds" fullwidth />
      </div>
    </div>
  );
};

export default WithdrawFunds;
