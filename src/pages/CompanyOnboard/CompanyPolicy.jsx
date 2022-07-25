import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, SelectInput } from "../../components/Input";
import { companyPolicy } from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../components/Message/Message";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, persistSelector } from "../../slices/persist";

const CompanyPolicy = () => {
    const history = useHistory();
    const { user } = useSelector(persistSelector);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const salaryDates = [
        { id: 0, name: "First Week", value: "first_week" },
        { id: 1, name: "Second Week", value: "second_week" },
        { id: 2, name: "Last Week", value: "last_week" },
    ];
    const [selectedValue, setSelectedValue] = useState(salaryDates[0]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    console.log(user);

    const onSubmit = async formData => {
        console.log(formData);
        if (formData) {
            const payload = {
                company_id: user?.company_id,
                salary_date: formData.id_type,
                salary_withdrawal_percentage:
                    formData.salary_withdrawal_percentage,
                payroll_size: formData.payroll_size,
            };
            setLoading(true);
            try {
                const res = await companyPolicy(payload);

                setLoading(false);
                console.log(res);

                // dispatch(
                //     setUser({
                //         ...user,
                //         company: res.data.payload.data,
                // company_id: res.data.payload.data.id,
                //     })
                //         ...formData,
                // salary_date: selectedValue?.value,
                // );

                history.push("/dashboard");
                // history.push("/onboard/step4");
            } catch (error) {
                toast.error("An error occurred");
                setError(true);
                // console.log(error.response.data.payload.data);
                setLoading(false);
                setErrMessage(error.response.data.payload.data);
                // setErrMessage(error);
            }
        }
    };

    return (
        <div>
            <div className='text-xl font-semibold md:text-2xl'>
                Company Policy
            </div>
            <p className='max-w-md mt-2 text-sm text-gray-400 md:text-base'>
                Kindly complete the steps below to activate your account, once
                you have complete all the required section, clicks on Request
                Activation
            </p>

            {error && <ErrorMessage title='Error' message={errMessage} />}
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Payroll size'
                            name='payroll_size'
                            placeholder='Enter payroll size'
                            type='text'
                            errors={errors.payroll_size ?? false}
                            {...register("payroll_size", { required: true })}
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <SelectInput
                            label='ID Type'
                            required
                            options={salaryDates}
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            setFormValue={setValue}
                            {...register("id_type", { required: true })}
                        />
                    </div>
                </div>

                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Withdrawn percentage %'
                            name='salary_withdrawal_percentage'
                            placeholder='20'
                            type='number'
                            value='50'
                            errors={
                                errors?.salary_withdrawal_percentage ?? false
                            }
                            {...register("salary_withdrawal_percentage", {
                                required: true,
                            })}
                        />
                    </div>
                </div>
                <div className='flex justify-between mt-10 signUp__submit-btn'>
                    <Link to='/onboard/step2'>
                        <button className='py-3 text-sm font-semibold bg-gray-100 rounded-md px-7 md:text-base'>
                            Go back
                        </button>
                    </Link>
                    <Button type='submit' buttonText='Save' loading={loading} />
                </div>
            </form>
        </div>
    );
};

export default CompanyPolicy;
