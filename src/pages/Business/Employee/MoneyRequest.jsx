import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";
import { requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const maritalStatusData = [
    { id: 5543, name: "One Day", value: "single" },
    { id: 14477, name: "One Week", value: "married" },
    { id: 9654, name: "One Month", value: "divorced" },
    { id: 3241, name: "One Year", value: "widowed" }
  ];

const MoneyRequest = () => {
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
          <Link to="/user/dashboard">
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
          <Link to="/business/money">
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
            Money Request
          </div>

          <form onSubmit={submitRequest}>
            <InputField
              type="text"
              label="Title of request "
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              placeholder="Enter Name "
              // required
            />

            <InputField
              type="text"
              label="Amount"
              placeholder="Enter Amount"
              // required
            />

            <label className="font-medium">Duration</label>
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
           
            <InputField
              type="text"
              label="Percentage "
              placeholder="0.3 % daily "
              // required
            />
           
            <Button
              buttonText="Request Money"
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
  )
}

export default MoneyRequest
