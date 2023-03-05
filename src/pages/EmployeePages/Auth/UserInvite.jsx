import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { InputField, PasswordInput } from "../../../components/Input";
import { employeeInvite } from "../../../utils/ApiRequests";
import { setExpiryTimeToStorage } from "../../../utils/ApiUtils";
import { ErrorMessage } from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "is-email";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, persistSelector } from "../../../slices/persist";
import { getUserEmail } from "../../../slices/employee/employeeSlice";
import { emailContext } from "../../../routes/AuthRoute";
import { toast } from "react-toastify";

export const UserInvite = () => {
  const dispatch = useDispatch();
  const data = useSelector(persistSelector);

  const {setEmailState} = useContext(emailContext)

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

    // if (formData) {
      setLoading(true);
      try {
        const {data} = await employeeInvite({...formData, title: "email_verification"});
        // dispatch(setUser(res.data.payload.data));
        // Cookies.set('PAYSL-ADTK', res.data.payload.data.token);
        // setExpiryTimeToStorage(new Date());
        // res.data.payload.data.company ? history.push('/dashboard') : history.push('/onboard/step1');
        if(data.status) {
          setEmailState(formData.email)
          history.push('/user/request_otp')
          toast.success(data.message)
          setLoading(false);
        }
        else {
          toast.error(data.message)
          setLoading(false);

        }
      } catch (error) {
        setLoading(false);
        // console.log("error", error);
        setError(true);
      }
      finally {
        setLoading(false)
      }
    // }

    // dispatch(getUserEmail(formData))
    console.log("formData")
    console.log(formData)
    // history.push("/user/request_otp");
  };
  return (
    <>
      <div className="mobiles:p-0 flex flex-col mobiles:block mobiles:mt-20 mobiles:h-0 h-full justify-center mobiles:w-full auth_container mx-auto">
        <h1 className="text-[21px] md:text-3xl font-bold uppercase">
          Registration (step 1)
        </h1>
        {error && (
          <ErrorMessage
            title="Error"
            message="An error occurred. Please ensure your email and password is correct."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${!error && "mt-[46px]"}`}>
            <InputField
              label="Enter email for OTP request"
              type="email"
              name="email"
              placeholder="e.g Kelly@farfill.com"
              errors={errors?.email ?? false}
              {...register("email", {
                required: true,
                validate: (value) =>
                  isEmail(value) || "Please enter a valid email address",
              })}
            />
          </div>
          <div className="flex justify-between items-center text-sm md:text-base">
            <div className="signUp__submit-btn flex justify-end">
              <Button type="submit" buttonText="Next" loading={loading}  />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
