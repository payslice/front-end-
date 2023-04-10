import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";
import { requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const maritalStatusData = [
    { id: 5543, name: "UBA", value: "single" },
    { id: 14477, name: "GTBank", value: "married" },
    { id: 9654, name: "Access Bank", value: "divorced" },
    { id: 3241, name: "Zenith Bank", value: "widowed" },
    { id: 7769, name: "Stanbic IBTC", value: "separated" },
  ];

const TransferMoney = () => {
    const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit } = useForm();

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
    <>
      <div
        className="w-full mt-10 flex justify-center font-bold withdraww"
        style={{ color: "rgba(17, 17, 17, 0.6)" }}>

        <div className="relative">
          <Link to="/business/transfer">
            <div className="absolute right-36 flex" style={{ width: "90px" }}>
              <svg
                className="mt-12"
                style={{ marginTop: "5px" }}
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z"
                  fill="#737A91"
                />
              </svg>
              <span className="font-normal text-base pl-5" style={{}}>
                Go back
              </span>
            </div>
          </Link>
        </div>

        <div className="w-1/2">
          <Link to="/user/dashboard">
            <div className="lg:hidden flex mb-12">
              <svg
                className="mt-12"
                style={{ marginTop: "5px" }}
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z"
                  fill="#737A91"
                />
              </svg>
              <span className="font-normal text-base pl-5" style={{}}>
                Go back
              </span>
            </div>
          </Link>

          <div className="text-2xl font-semibold mb-6 capitalize text-black">
            Transfer Money
          </div>

          <form onSubmit={submitRequest}>
            <InputField
              type="text"
              label="Balance"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="NGN 120,000"
              // required
            />

            <InputField
              type="text"
              label="Amount"
              placeholder="NGN 130,000"
              // required
            />

            <label className="font-medium">Bank Name</label>
            <select
              {...register("marital_status", { required: true })}
              name="marital_status"
              className="bg-gray-100 px-5 py-5 w-full rounded"
            >
              <option value=""></option>
              {maritalStatusData.map(({ id, name, value }) => (
                <option value={value} key={id}>
                  {name}
                </option>
              ))}
            </select>
            
            <div className="grid grid-cols-2 gap-4">
            <InputField
              type="text"
              label="Account Number"
              className=""
            />

            <InputField
              type="text"
              label="Account Name"
            />
            </div>
           
            <InputField
              type="text"
              label="Narration"
              placeholder="Simple Description of Payment"
              // required
            />

              <InputField
              type="text"
              label="Enter Pin"
              placeholder="********"
              // required
            />
           
            <Button
              buttonText="Make Payments"
              fullwidth
              loading={submitting}
              type="submit"
              className="py-5 mt-5"
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
    </>
  );
}

export default TransferMoney
