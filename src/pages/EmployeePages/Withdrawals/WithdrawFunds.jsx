import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";
import { requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";

const WithdrawFunds = () => {
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const submitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await requestWithdrawal({ amount: amount });
      setSubmitting(false);
      setSuccess(true);
      setAmount("");
    } catch (error) {
      setSubmitting(false);

      error &&
        toast.error(
          error.response.data.payload?.data?.errors?.amount[0] ||
            error.response.data.payload.data.message ||
            error.response.data.payload.data
        );

      setSuccess(false);
    }
  };

  return (
    <div className="w-full mt-10 flex justify-center ">
      <div>
        <div className="text-2xl">Withdraw funds</div>
        <p>
          Please note that funds will be sent to your bank account <br />
          currently linked with your Payslice wallet or account.{" "}
        </p>
        <form onSubmit={submitRequest}>
          <InputField
            type="text"
            label="Amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            placeholder="Enter amount"
            required
          />

          <p>
            Serivce Charge: <strong>NGN 500</strong> for withdrawal of 5,000 -
            10,000
          </p>
          <p>
            Serivce Charge: <strong>NGN 750</strong> for withdrawal of 11,000 -
            25,000
          </p>
          <p>
            Minimum amount is <strong>NGN5,000</strong> and max amount is{" "}
            <strong>NGN 40,000</strong>{" "}
          </p>
          <p>This takes between 24 - 48 hours </p>
          <Button
            buttonText="Withdraw Funds"
            fullwidth
            loading={submitting}
            type="submit"
          />
        </form>
        {success && (
          <SuccessMessage
            title="Success"
            message="Your request has been sent, you'll get a response from us soon."
          />
        )}
      </div>
    </div>
  );
};

export default WithdrawFunds;
