import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { InputField, PasswordInput } from "../../../components/Input";
import { employeeOTPRequest } from "../../../utils/ApiRequests";
import { ErrorMessage } from "../../../components/Message/Message";
import { useForm } from "react-hook-form";
import isEmail from "is-email";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, persistSelector } from "../../../slices/persist";
import { emailContext } from "../../../routes/AuthRoute";
import { toast } from "react-toastify";



export const UserOTPRequest = () => {
  const dispatch = useDispatch();
  const data = useSelector(persistSelector);

  const {emailState} = useContext(emailContext)

  console.log("emailRecievedContext userotp")
  console.log(emailState)

  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const onSubmit = async (formData) => {
    
    console.log("formData useFOrm")
    console.log(formData)

    try {
          setLoading(true)
          const {data} = await employeeOTPRequest({...formData, email: emailState})

          if (data.status) {
            history.push("/user/register");
            toast.error(data.message)
            setLoading(false)
          }
          else {
            toast.error(data.message)
            setLoading(false)
          }
          console.log(data)
    }
    catch(err) {
      
      setLoading(false)

    }
    finally {
      setLoading(false)
    }
  };
  return (
    <>
      <div className="mobiles:p-0 flex flex-col mobiles:block mobiles:mt-20 mobiles:h-0 h-full justify-center mobiles:w-full auth_container mx-auto">
        <h1 className="text-[21px] md:text-3xl font-bold uppercase">
          REGISTRATION (STEP 2)
        </h1>
        {error && (
          <ErrorMessage
            title="Error"
            message="An error occurred. Please ensure your input value is correct."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${!error && "mt-[46px]"}`}>
            <InputField
              label="Verify OTP"
              type="text"
              name="otp"
              placeholder="e.g 574661"
              {...register('otp', {
                required: true
              })}
              required
            />
          </div>
          <div>
            <p> An OTP code has been sent to your email. Check your email</p>
          </div>
          <br />
          <div className="flex justify-between items-center text-sm md:text-base">
            <div className="signUp__submit-btn flex justify-end">
              <Button type="submit" buttonText="Submit" loading={loading} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserOTPRequest;
