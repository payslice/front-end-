import React from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";

const ConfirmPayday = () => {
  return (
    <div className="w-2/4 justify-center m-auto">
      <div className="header">
        <h2 className="text-2xl">Confrim payday </h2>
        <p>We need some information about how you want to pay</p>
      </div>
      <div className="payment-form ">
        <div>
          <label>Payment Option</label>
          <div className="select-pay mb-5 mt-2">
            <select
              name="select pay option"
              className="bg-gray-200 px-5 py-3 w-full rounded "
            >
              <option value="payslice">Payslice</option>
              <option value="Direct Debit (Mono )">Direct Debit (Mono )</option>
              <option value="Bank Transfer"> Bank Transfer</option>
            </select>
          </div>
        </div>

        <InputField
          label="Total Payroll"
          type="text"
          required
          placeholder="NGN 130,0000"
        />
        <InputField
          label="Narration"
          type="text"
          required
          placeholder="Simple Description of Payment "
        />
        <div>
          <label>Time of payment </label>
          <div className="select-pay mb-5 mt-2">
            <select
              name="select pay option"
              className="bg-gray-200 px-5 py-3 w-full rounded "
            >
              <option value="payslice">Payslice</option>
              <option value="Direct Debit (Mono )">Direct Debit (Mono )</option>
              <option value="Bank Transfer"> Bank Transfer</option>
            </select>
          </div>
        </div>
        <Button buttonText="Make payemnt" fullwidth />
      </div>
    </div>
  );
};

export default ConfirmPayday;
