import { useState } from "react";
import { useHistory } from "react-router-dom";
// import { app } from "./base";
// import * as yup from "yup";
import { Button } from "../../components/Button/Button";
import { InputField, SelectInput } from "../../components/Input";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { companyRepOnboarding } from "../../utils/ApiRequests";
// import { companyRepOnboarding, uploadFile } from "../../utils/ApiRequests";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
import { persistSelector } from "../../slices/persist";
// import { setUser, persistSelector } from "../../slices/persist";

const CompanyRepresentative = () => {
    const history = useHistory();
    const { user } = useSelector(persistSelector);
    // const dispatch = useDispatch();
    const idTypes = [
        { id: 0, name: "Passport", value: "international passport" },
        { id: 1, name: "NIN", value: "nin" },
        { id: 2, name: "Voters Card", value: "permanent voters card" },
    ];

    console.log(user);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const [selectedValue, setSelectedValue] = useState(idTypes[0]);
    const [loading, setLoading] = useState(false);

    const onSubmit = async formData => {
        if (formData) {
            setLoading(true);
            try {
                const res = await companyRepOnboarding({
                    // company_id: user?.company?.id,
                    // company_id: user?.company_id,
                    company_id: sessionStorage.getItem("P_Slice_CID"),
                    user_id: user?.id,
                    id_type: [
                        {
                            in: [selectedValue?.value],
                        },
                    ],
                    ...formData,
                });

                if (res.status === 200 && res.data) {
                    setLoading(false);
                    reset();
                    sessionStorage.setItem(
                        "P_Slice_CID",
                        res.data.payload.data.id
                    );
                    console.log(res.data.payload.data);

                    // dispatch(
                    //     setUser({
                    //         ...user,
                    //         company: res.data.payload.data.company,
                    //         company_id: res.data.payload.data.company_id,
                    //     })
                    // );

                    history.push("/onboard/step3");
                }
            } catch (error) {
                console.log(error?.response?.data?.payload);
                toast.error(
                    error?.response?.data?.payload?.data?.errors?.name[0] ||
                        "An error occurred"
                );
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div className='text-xl font-semibold md:text-2xl'>
                Company Representative
            </div>
            <p className='max-w-md mt-2 text-sm text-gray-400 md:text-base'>
                Kindly complete the steps below to activate your account, once
                you have complete all the required section, clicks on Request
                Activation
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Legal name'
                            name='legal_name'
                            placeholder='ABC Company'
                            type='text'
                            errors={errors.legal_name ?? false}
                            {...register("legal_name", { required: true })}
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Address'
                            name='address'
                            placeholder='ABC Company'
                            type='text'
                            errors={errors.address ?? false}
                            {...register("address", { required: true })}
                        />
                    </div>
                </div>
                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Date of birth'
                            name='date_of_birth'
                            placeholder='ABC Company'
                            type='date'
                            errors={errors.date_of_birth ?? false}
                            {...register("date_of_birth", { required: true })}
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <SelectInput
                            label='ID Type'
                            required
                            options={idTypes}
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
                            label='ID number'
                            name='id_number'
                            placeholder='ABC Company'
                            type='number'
                            errors={errors.id_number ?? false}
                            {...register("id_number", { required: true })}
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Ownership percentage'
                            name='ownership_percentage'
                            placeholder='10'
                            type='tel'
                            errors={errors.ownership_percentage ?? false}
                            {...register("ownership_percentage", {
                                required: true,
                            })}
                        />
                    </div>
                </div>
                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Title (if a senior manager)'
                            name='title'
                            placeholder='ABC Company'
                            type='text'
                            errors={errors.title ?? false}
                            {...register("title", {
                                required: true,
                                minLength: 2,
                            })}
                        />
                    </div>

                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='BVN'
                            name='bankDetails'
                            placeholder='Bank Verification Number'
                            type='text'
                            errors={errors.title ?? false}
                            {...register("bankDetails", {
                                required: true,
                            })}
                        />
                    </div>
                </div>

                <div className='flex justify-between mt-10 signUp__submit-btn'>
                    <Link to='/onboard/step1'>
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

export default CompanyRepresentative;
