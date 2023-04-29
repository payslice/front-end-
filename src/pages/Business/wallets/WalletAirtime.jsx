import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, SelectInput } from "../../../components/Input";
import { businessAssociateMoneyRequest, businessWalletAirtime, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";



const networkTypes = [
    { name: 'Mtn', value: 'mtn' },
    { name: 'Airtel', value: 'airtel' },
    { name: 'Glo', value: 'glo' },
    { name: '9 mobile', value: 'etisalat' },
];


const WalletAirtime = () => {
    const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [durationTitle, setdurationTitle] = useState(false);
  const [networkState, setnetworkState] = useState(false);
  const history = useHistory()
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const {data} = await businessWalletAirtime({...formData, network: networkState.value});

      console.log(data)
      
      if (data.status) {
          toast.success(data.message)
          history.push("/business/wallets");
          setSubmitting(false);
      }
      else {
          toast.error(data.message)
          setSubmitting(false);
      }


    } catch (error) {
      toast.error(error)
      setSubmitting(false);
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
          <Link to="/business/wallets">
            <div className="absolute right-36 hiden md:flex" style={{ width: "90px" }}>
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
          <Link to="/business/wallets">
            <div className="flex md:hidden mb-12">
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
            Buy Airtime 
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            <InputField
              type="text"
              label="Amount"
              placeholder="Enter Amount"
              {...register('amount')}
              // required
            />
            
            <SelectInput
                name="network"
                label="Network"
                selectedValue={networkState}
                setSelectedValue={setnetworkState}
                options={networkTypes}
            />
           
            <InputField
              type="number"
              label="Phone Number "
              placeholder=""
              {...register('phone_number')}
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

        </div>
      </div>
    </>
  )
}

export default WalletAirtime
