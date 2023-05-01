import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField, SelectInput } from "../../../components/Input";
import { businessAssociateMoneyRequest, payrollCreateEmployee, requestWithdrawal } from "../../../utils/ApiRequests";
import { SuccessMessage } from "../../../components/Message/Message";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { listBanks } from "../../../utils/banksapi";

const statusTypes = [
  { name: 'Active', value: 'Active' },
  { name: 'Inactive', value: 'Inactive' }
];


const CreateEmployeePayroll = () => {
    const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statustitle, setstatusTitle] = useState();
  const [bank, setBank] = useState();

  const history = useHistory();
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    setSubmitting(true);
    console.log("formData")
    console.log({...formData, duration: statustitle.value})
    try {
      const {data} = await payrollCreateEmployee({...formData, bank_code:  bank.code, status: statustitle.value});
      
      if (data.status) {
          toast.success(data.message)
          history.push("/business/payroll");
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
            Create Employee
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="number"
              label="Salary"
              {...register('salary')}
              placeholder="Enter Salary "
              required
            />

            
            <SelectInput
                label="Bank"
                options={listBanks}
                selectedValue={bank}
                setSelectedValue={setBank}
                required
            />

            <InputField
              type="text"
              label="Email"
              placeholder=""
              {...register('email')}
              // required
            />
            <InputField
              type="text"
              label="Phone Number"
              placeholder=""
              {...register('phone')}
              // required
            />
            <InputField
              type="text"
              label="Full Name"
              placeholder=""
              {...register('full_name')}
              required
            />
            <InputField
              type="text"
              label="Account Number"
              placeholder=""
              {...register('account_number')}
              required
            />

            <SelectInput
                name="status"
                label="Status"
                selectedValue={statustitle}
                setSelectedValue={setstatusTitle}
                options={statusTypes}
                required
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

export default CreateEmployeePayroll
