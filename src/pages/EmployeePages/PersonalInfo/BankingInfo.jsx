import React from "react";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";

const BankingInfo = () => {
  return (
    <div className="px-8">
      <div className="text-2xl my-4">Banking Information</div>

      <form>
        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label="Bank Name " type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label=" Account Number " type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label=" Account Name " type="text" />
          </div>
        </div>
        <Button buttonText="Update Details" />
      </form>
    </div>
  );
};

export default BankingInfo;
