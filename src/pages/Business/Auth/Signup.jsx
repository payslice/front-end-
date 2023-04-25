import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { InputField, PasswordInput, SelectInput } from "../../../components/Input";
import { businessRegister, employeeLogin } from "../../../utils/ApiRequests";
import { setExpiryTimeToStorage } from "../../../utils/ApiUtils";
import { ErrorMessage } from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "is-email";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, persistSelector } from "../../../slices/persist";
import { toast } from "react-toastify";


const genderTypes = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
];

export const BusinessSignup = () => {

        const dispatch = useDispatch();
        const [loading, setLoading] = useState(false); 
        const [error, setError] = useState(false);
	const [gender, setGender] = useState(genderTypes[0]);
        const history = useHistory();

        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm();

        const onSubmit = async (formData) => {
                if (formData) {
                        setLoading(true);
                        try {
                                const {data} = await businessRegister({...formData, gender: gender.value});

                                if(data.status){
                                        setLoading(false);
                                        history.push("/onboard/step1")
                                        toast.success(data.message)
                                }
                                else {
                                  toast.error(data.message)
                                  setLoading(false);
                                }
                        } catch (error) {
                                setLoading(false);
                                setError(true);
                        }
                }
        };

  return (
    <>
      <div className="mobiles:p-0 flex flex-col mobiles:block mobiles:mt-0 mobiles:h-0 h-full justify-center mobiles:w-full auth_container mx-auto">
        <h1 className="text-[21px] md:text-3xl font-bold uppercase pt-32 mt-0 lg:mt-48">SIGN UP</h1>
        {error && (
          <ErrorMessage
            title="Error"
            message="An error occurred. Please ensure your email and password is correct."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`${!error && "mt-[46px]"}`}>
                        <InputField
                                label="First Name"
                                type="name"
                                name="first_name"
                                placeholder="e.g Kelly"
                                errors={errors?.first_name ?? false}
                                {...register("first_name", {
                                        required: true
                                })}
                                required
                        />
                        <InputField
                                label="Last Name"
                                type="name"
                                name="last_name"
                                placeholder="e.g Charles"
                                errors={errors?.last_name ?? false}
                                {...register("last_name", {
                                        required: true
                                })}
                                required
                        />
                        <InputField
                                label="Business Email Address"
                                type="email"
                                name="email"
                                placeholder="e.g Kelly@farfill.com"
                                errors={errors?.email ?? false}
                                {...register("email", {
                                required: true
                                })}
                                required
                        />
                        <InputField
                                label="Phone Number"
                                type="number"
                                name="phone_number"
                                placeholder="e.g 09043124913"
                                errors={errors?.phone_number ?? false}
                                {...register("phone_number", {
                                        required: true,
                                })}
                                required
                        />
                        <SelectInput
                                name="gender"
                                label="Gender"
                                selectedValue={gender}
                                setSelectedValue={setGender}
                                options={genderTypes}
                        />
                        <PasswordInput
                                label="Enter password"
                                name="password"
                                placeholder="Enter password"
                                errors={errors?.password ?? false}
                                {...register("password", { required: true, minLength: 6 })}
                                required
                        />
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                        <Link to="/reset-password" className="text-red-500">
                                Forgot password?
                        </Link>
                        <div className="signUp__submit-btn flex justify-end">
                                <Button type="submit" buttonText="Next" loading={loading} />
                        </div>
                </div>
        </form>

        <div className="mt-16 text-sm md:text-base">
          Own an account?{" "}
          <Link to="/onboard/step1" className="font-medium text-primary ml-1 pb-10">
            Login Up now
          </Link>
        </div>
      </div>
    </>
  );
};
