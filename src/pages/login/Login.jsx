import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, PasswordInput } from "../../components/Input";
import { employerLogin } from "../../utils/ApiRequests";
import { setExpiryTimeToStorage } from "../../utils/ApiUtils";
import { ErrorMessage } from "../../components/Message/Message";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "is-email";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser, persistSelector } from "../../slices/persist";

export const Login = () => {
    const dispatch = useDispatch();
    const data = useSelector(persistSelector);

    console.log(data);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();

    const onSubmit = async formData => {
        if (formData) {
            setLoading(true);
            try {
                const res = await employerLogin(formData);

                dispatch(setUser(res.data.payload.data));
                Cookies.set("PAYSL-ADTK", res.data.payload.data.token);
                setExpiryTimeToStorage(new Date());
                setLoading(false);
                // localStorage.setItem("companyId", res.data.payload.data);

                // dispatch();
                console.log(res.data.payload.data);

                res.data.payload.data.company
                    ? history.push("/dashboard")
                    : history.push("/onboard/step1");
            } catch (error) {
                setLoading(false);
                console.log("error", error);
                setError(true);
            }
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center h-full mx-auto mobiles:p-0 mobiles:block mobiles:mt-20 mobiles:h-0 mobiles:w-full auth_container'>
                <h1 className='text-[21px] md:text-3xl font-bold uppercase'>
                    login
                </h1>
                {error && (
                    <ErrorMessage
                        title='Error'
                        message='An error occurred. Please ensure your email and password is correct.'
                    />
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${!error && "mt-[46px]"}`}>
                        <InputField
                            label='Business Email Address'
                            type='email'
                            name='email'
                            placeholder='e.g Kelly@farfill.com'
                            errors={errors?.email ?? false}
                            {...register("email", {
                                required: true,
                                validate: value =>
                                    isEmail(value) ||
                                    "Please enter a valid email address",
                            })}
                        />
                        <PasswordInput
                            label='Enter password'
                            name='password'
                            placeholder='Enter password'
                            errors={errors?.password ?? false}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                            })}
                        />
                    </div>
                    <div className='flex items-center justify-between text-sm md:text-base'>
                        <Link to='/reset-password' className='text-red-500'>
                            Forgot password?
                        </Link>
                        <div className='flex justify-end signUp__submit-btn'>
                            <Button
                                type='submit'
                                buttonText='Next'
                                loading={loading}
                            />
                        </div>
                    </div>
                </form>

                <div className='mt-16 text-sm md:text-base'>
                    Don't have an account?{" "}
                    <Link
                        to='/register'
                        className='ml-1 font-medium text-primary'>
                        Sign Up now
                    </Link>
                </div>
            </div>
        </>
    );
};
