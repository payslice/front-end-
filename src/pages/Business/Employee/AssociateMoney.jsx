import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, SelectInput } from "../../../components/Input";
import { businessAssociateMoneyRequest, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

  const repayMethodTypes = [
    { name: 'Amortized', value: 'amortized' },
    { name: 'Bullet', value: 'bullet' }
];

const durationTypes = [
  { name: '1 week', value: '7' },
  { name: '2 weeks', value: '14' },
  { name: '1 month', value: '30' },
  { name: '2 months', value: '60' },
  { name: '3 months', value: '90' },
  { name: '4 months', value: '120' },
  { name: '6 months', value: '180' },
];


const AssociateMoney = () => {
    const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [durationTitle, setdurationTitle] = useState(false);
  const [repayMethodTitle, setrepayMethodTitle] = useState(false);

  const history = useHistory()
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    setSubmitting(true);
    console.log("formData")
    console.log({...formData, duration: durationTitle.value, repay_method: repayMethodTitle.value})
    try {
      const {data} = await businessAssociateMoneyRequest({...formData, 
        duration: durationTitle.value, 
        repay_method: repayMethodTitle.value
      });
      
      if (data.status ) {
          toast.success(data.message)
          history.push("/business/request_money");
          setSubmitting(false);
      }
      else {
          toast.error(data.message)
          setSubmitting(false);
      }


    } catch (error) {
      toast.error(error)
      setSubmitting(false);

      // error &&
      //   toast.error(
      //     error.response.data.payload?.data?.errors?.amount[0] ||
      //       error.response.data.payload.data.message ||
      //       error.response.data.payload.data
      //   );

      // setSuccess(false);
    }
    finally {
      setSubmitting(false);

    }
  };


  return (
    <>
      <div
        className="w-full mt-10 flex justify-center font-bold withdraww"
        style={{ color: "rgba(17, 17, 17, 0.6)" }}>

        <div className="relative">
          <Link to="/user/dashboard">
            <div className="absolute right-36 flex hidden" style={{ width: "90px" }}>
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

        <div className="w-full md:w-1/2">
          <Link to="business/associate">
            <div className="hidden flex mb-12">
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
            Associate money 
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              label="Title of request "
              {...register('title')}
              placeholder="Enter Title "
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
           
            <InputField
              type="number"
              label="Percentage Payback "
              placeholder="0.3 % daily "
              {...register('percentage')}
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

export default AssociateMoney
