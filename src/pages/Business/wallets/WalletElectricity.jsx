import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, SelectInput } from "../../../components/Input";
import { businessAssociateMoneyRequest, businessWalletElectricity, requestWithdrawal } from "../../../utils/ApiRequests";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";



const serviceTypes = [
    { name: 'Abuja electric', value: 'abuja-electric' },
    { name: 'Eko electric', value: 'eko-electric' },
    { name: 'Ibadan Electric', value: 'ibadan-electric' },
    { name: 'Ikeja Electric', value: 'ikeja-electric' },
    { name: 'Jos electric', value: 'jos-electric' },
    { name: 'Kaduna Electric', value: 'kaduna-electric' },
    { name: 'Kano Electric', value: 'kano-electric' },
    { name: 'Portharcourt electric', value: 'portharcourt-electric' },
];

const variationTypes = [
    { name: 'Prepaid', value: 'Prepaid' },
    { name: 'postpaid', value: 'postpaid' }
];


const WalletElectricity = () => {
    const [submitting, setSubmitting] = useState(false);
  const [service, setservice] = useState("");
  const [variation, setVariation] = useState("");
  const [success, setSuccess] = useState(false);
  const [durationTitle, setdurationTitle] = useState(false);
  const [networkState, setnetworkState] = useState(false);
  const history = useHistory()
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    setSubmitting(true);
    console.log("formData")
    console.log({...formData, duration: durationTitle.value, repay_method: networkState.value})
    try {
      const {data} = await businessWalletElectricity({...formData, 
        service_id: service.value, 
        variation: variation.value
      });
      
      if (data.status ) {
          toast.success(data.message)
          history.push("/business/dashboard");
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
          Electricity Top Up
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
           
            <InputField
              type="number"
              label="Amount"
              placeholder=""
              {...register('amount')}
              // required
            />

            <InputField
              type="number"
              label="Phone Number "
              placeholder=""
              {...register('phone')}
              // required
            />

            <InputField
              type="number"
              label="Meter Number"
              placeholder=""
              {...register('meter_number')}
              // required
            />
            
            <SelectInput
                name="service"
                label="Service"
                selectedValue={service}
                setSelectedValue={setservice}
                options={serviceTypes}
            />
           
            <SelectInput
                name="variation"
                label="Variation"
                selectedValue={variation}
                setSelectedValue={setVariation}
                options={variationTypes}
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

export default WalletElectricity
