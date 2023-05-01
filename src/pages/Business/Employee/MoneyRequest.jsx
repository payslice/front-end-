import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, SelectInput } from "../../../components/Input";
import { businessMoneyRequest, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { BackButton } from "../../../components/BackButton";


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
      
      if (data.status) {
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
        className="w-full mt-0 font-bold withdraww"
        style={{ color: "rgba(17, 17, 17, 0.6)" }}>
          <div className="flex">
          </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-1/12"></div>
              <div className="w-2/12 hidden">
                <BackButton />
              </div>
              <div className="w-2/12"></div>

              <div className="w-full md:w-6/12">
                <Link to="/business/money">
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
    
                <div className="text-2xl font-semibold mb-6 capitalize text-black mt-5">
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
      </div>
    </>
  )
}

export default MoneyRequest
