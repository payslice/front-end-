import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";
import { employeeTransactionRequestMoney, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import persist from "../../../slices/persist";
import { getUserDataFromStorage } from "../../../utils/ApiUtils";

const WithdrawFunds = () => {
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [charge, setcharge] = useState("");
  const [success, setSuccess] = useState(false);

  const history = useHistory()

  const {user} = persist
  console.log("user")
  console.log(user)

  useEffect(() => {
    if(amount < 5000) {
      setcharge(250)
    }
    else if (amount < 10000 ) setcharge(500)
    else if (amount < 25000 ) setcharge(750)
    else if (amount < 40000 ) setcharge(750)
    else if (amount > 40000 ) setcharge(1250)


  }, [amount])
  
  console.count("renderer ")

  
	console.log("getUserDataFromStorage()")
	let persistUserData = getUserDataFromStorage()
	let convertedPersistedData = JSON.parse(persistUserData.persist)
	console.log(convertedPersistedData.user.employeeIds[0])

  const {register, handleSubmit} = useForm({
    defaultValues: {
      amount: 0,
      employee_id: convertedPersistedData.user.employeeIds[0]
    }
  })

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const {data} = await employeeTransactionRequestMoney({ ...formData, amount: amount });
      if(data.status) {
        toast.success(data.message)
        history.push('/user/withdrawals/withdraw/processing')
      }
      else {
        toast.error(data.message)
      }
      setSubmitting(false);
      setSuccess(true);
    } catch (error) {
      setSubmitting(false);

      error &&
        toast.error(
          error.response.data.payload?.data?.errors?.amount[0] ||
            error.response.data.payload.data.message ||
            error.response.data.payload.data
        );

      // setSuccess(false);
    }
  };

  return (
    <div className="w-full mt-10 flex justify-center font-bold withdraww" style={{color: 'rgba(17, 17, 17, 0.6)'}}>
      <div className="relative">
        <Link to="/user/dashboard">
        <div className="absolute right-36 flex" style={{ width: '90px'}}>
          <svg className="mt-12" style={{marginTop: '5px'}} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z" fill="#737A91"/>
          </svg>
          <span className="font-normal text-base pl-5" style={{}} >
            Go back
          </span>
        </div>
        </Link>
      </div>

      <div>
      
      <Link to="/user/dashboard">
        <div className="lg:hidden flex mb-12">
          <svg className="mt-12" style={{marginTop: '5px'}} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z" fill="#737A91"/>
          </svg>
          <span className="font-normal text-base pl-5" style={{}} >
            Go back
          </span>
        </div>
        
      </Link>

        <div className="text-2xl font-semibold mb-6 capitalize text-black">Withdraw funds</div>
        <p className="text-xs lg:text-base font-bold capitalize mb-7 leading-loose">
          Please note that funds will be sent to your bank account <br />
          currently linked with your Payslice wallet or account.{" "}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <InputField
              type="text"
              label="Amount"
              onChange={(e) => setAmount(e.target.value)}
              // {...register("amount", {required: true, max: 40000})}
              // value={amount}jh
              placeholder="Enter amount"
              required
            />
        

            <InputField
              type="text"
              label="Employee ID"
              placeholder="Tejriljy"
              {...register("employee_id", {required: true})}
              disabled
            />
          

            <InputField
              type="text"
              label="Service Charge"
              placeholder=""
              value={charge}
              required
              disabled
            />
    
            
          <div className="container lg:hidden">
            <div className="flex justify-between font-semibold text-sm mb-10" style={{marginTop: '-12px'}} >
              <p>Min: NGN 5000</p>
              <p>Max: NGN 40000</p>
            
            </div>
          </div>

          <p className="mb-2 lg:mb-5 font-medium lg:font-bold">
          
          </p>
          {/*
          <p>
            Serivce Charge: <strong>NGN 500</strong> for withdrawal of 5,000 -
            10,000
          </p>
        */}
        {/*
          <p>
            Serivce Charge: <strong>NGN 750</strong> for withdrawal of 11,000 -
            25,000
          </p>
        */}
          <p className="capitalize mb-5 hidden lg:block">
            Minimum amount is NGN5,000 and max amount is NGN 40,000 {" "}
          </p>

          <p className="capitalize mb-10 font-medium lg:font-bold">This takes between 24 - 48 hours </p>
          <Button
            buttonText="Withdraw Funds"
            fullwidth
            loading={submitting}
            type="submit"
            className="py-5"
          />
        </form>
        {/*
        {success && (
          <SuccessMessage
            title="Success"
            message="Your request has been sent, you'll get a response from us soon."
          />
        )}
      */}
      </div>
    </div>
  );
};

export default WithdrawFunds;
