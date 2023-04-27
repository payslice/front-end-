import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, SelectInput } from "../../../components/Input";
import { businessMoneyRequest, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";


const repayMethodTypes = [
  { name: 'Amortized', value: 'amortized' },
  { name: 'Bullet', value: 'bullet' }
];

  const durationTypes = [
    { name: '7', value: '7' },
    { name: '14', value: '14' },
    { name: '30', value: '30' },
    { name: '60', value: '60' },
    { name: '90', value: '90' },
    { name: '120', value: '120' },
    { name: '180', value: '7' },
];

const MoneyRequest = () => {
    const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [durationTitle, setdurationTitle] = useState(false);
  const [repayMethodTitle, setrepayMethodTitle] = useState(false);
  
  const { register, handleSubmit } = useForm();

  const history = useHistory()

  const onSubmit = async (formData) => {
    setSubmitting(true);
    console.log("formData")
    console.log({...formData, duration: durationTitle.value})
    try {
      const {data} = await businessMoneyRequest({...formData, duration: durationTitle.value, repay_method: repayMethodTitle.value});
      
      if (data.status === 200 ) {
          toast.success(data.message)
          setSubmitting(false);
          history.push("/business/dashboard");
      }
      else {
          toast.error(data.message)
          setSubmitting(false);
      }


    } catch (error) {
      toast.error(error)
      // setSubmitting(false);

      // error &&
      //   toast.error(
      //     error.response.data.payload?.data?.errors?.amount[0] ||
      //       error.response.data.payload.data.message ||
      //       error.response.data.payload.data
      //   );

      // setSuccess(false);
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              label="Title of request "
              {...register('title')}
              // value={amount}
              placeholder="Enter Name "
              // required
            />

            <InputField
              type="number"
              label="Amount"
              placeholder="Enter Amount"
              {...register('amount')}
              // required
            />
            
            <SelectInput
                name="duration"
                label="Duration"
                selectedValue={durationTitle}
                setSelectedValue={setdurationTitle}
                options={durationTypes}
            />
           
            <SelectInput
                name="repay_method"
                label="Repay Method"
                selectedValue={repayMethodTitle}
                setSelectedValue={setrepayMethodTitle}
                options={repayMethodTypes}
            />
           
            <Button
              buttonText="Request Money"
              fullwidth
              loading={submitting}
              type="submit"
              className="py-5 mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default MoneyRequest
