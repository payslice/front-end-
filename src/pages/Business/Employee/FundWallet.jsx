import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";
import { requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const maritalStatusData = [
    { id: 5543, name: "Card", value: "single" },
    { id: 14477, name: "Transfer", value: "married" },
  ];

const FundWallet = () => {
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
          <Link to="/business/wallet">
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
            Fund Wallet
          </div>

          <form onSubmit={submitRequest}>
          <label className="font-medium">Method of Payment </label>
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

            <div
                className="px-12 mt-12 py-6 rounded-l w-full 
                lg:w-full handle_user_homepage_responsive_in2 bg-[#F4F5F7]">

                
                  <div className="text-[#000]/[0.8] text-[13px]">
                    <span className="block font-medium">Acc. No : 7505519950 </span>
                    <span className="block font-medium">Acc. Name : payslice </span>
                    <span className="block font-medium">Bank : Providus Bank  </span>
                  </div>
            </div>
        
           
           
            <Button
              buttonText="I Have Made Payments"
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

export default FundWallet
