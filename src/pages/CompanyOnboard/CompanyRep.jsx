import { useRef, useState } from "react";
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
    const listTitle = [
        { id: 0, name: "Mr", value: "mr" },
        { id: 1, name: "Mrs", value: "mrs" },
        { id: 2, name: "Miss", value: "miss" },
    ];

    console.log(user);

    let fileInputRef = useRef(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const [selectedValue, setSelectedValue] = useState(idTypes[0]);
    const [selectedTitle, setSelectedTitle] = useState(listTitle[0]);
    const [loading, setLoading] = useState();
    const [imgFile, setImgFile] = useState();



    const onSubmit = async formData => {
        console.log(formData)
        if (formData) {
            setLoading(true);
            // console.log("CompanyReg")
            // console.log({...formData, title:selectedTitle.value, id_type: selectedValue.value })
            
            let formdata = new FormData()
            formdata.append("file", imgFile)
            // formdata.append("title", `${formData.title}`)
            // formdata.append("legal_name", formData.legal_name)
            // formdata.append("address", formData.address)
            // formdata.append("date_of_birth", formData.date_of_birth)
            // formdata.append("id_type", formData.id_type)
            // formdata.append("id_number", formData.id_number)
            // formdata.append("bvn", formData.bvn)
            // formdata.append("ownership_percentage", formData.ownership_percentage)

            console.log("formdata company rep")
            // console.log(formdata)
            let filee;
            for (const [key, value, file] of formdata) {
                console.log(value);
                filee = value
              }

              console.log("filee")
              console.log(filee)
              console.log({...formData, title:selectedTitle.value, id_type: selectedValue.value, id_file: filee }) 

            try {
                const {data} = await companyRepOnboarding({...formData, title:selectedTitle.value, id_type: selectedValue.value, id_file: filee }
                // {  
                //     // company_id: user?.company?.id,
                //     // company_id: user?.company_id,
                //     company_id: sessionStorage.getItem("P_Slice_CID"),
                //     user_id: user?.id,
                //     id_type: [
                //         {
                //             in: [selectedValue?.value],
                //         },
                //     ],
                //     ...formData,
                // }
                );

                
                if (data.status === 200 ) {
                    history.push("/business/dashboard");
                    toast.success(data.message)
                    setLoading(false);
                    // reset();
                    // sessionStorage.setItem(
                    //     "P_Slice_CID",
                    //     data.payload.data.id
                    // );
                    // console.log(data.payload.data);

                    // dispatch(
                    //     setUser({
                    //         ...user,
                    //         company: res.data.payload.data.company,
                    //         company_id: res.data.payload.data.company_id,
                    //     })
                    // );

                }
                else {
                    toast.error(data.message)
                    setLoading(false);

                }


                // if (data.status === 200 && res.data) {
                //     setLoading(false);
                //     reset();
                //     sessionStorage.setItem(
                //         "P_Slice_CID",
                //         res.data.payload.data.id
                //     );
                //     console.log(res.data.payload.data);

                //     // dispatch(
                //     //     setUser({
                //     //         ...user,
                //     //         company: res.data.payload.data.company,
                //     //         company_id: res.data.payload.data.company_id,
                //     //     })
                //     // );

                //     history.push("/onboard/step3");
                // }
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
            <p className='max-w-xl mt-4 text-sm text-[#111111]/[0.6] md:text-base font-medium'>
                Kindly complete the steps below to activate your account, once
                you have complete all the required section, clicks on Request
                Activation
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <div className='flex w-full mobiles:block'>
                
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        
                        <SelectInput
                            name="title"
                            label="Title "
                            options={listTitle}
                            selectedValue={selectedTitle}
                            setSelectedValue={setSelectedTitle}
                            required
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Legal name'
                            name='legal_name'
                            placeholder='ABC Company'
                            type='text'
                            {...register("legal_name", { required: true })}
                            required
                        />
                    </div>
                </div>
                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Address'
                            name='address'
                            placeholder="Company's address"
                            type='text'
                            {...register("address", { required: true })}
                            required
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Date of birth'
                            name='date_of_birth'
                            placeholder='Enter your date of birth'
                            type='date'
                            {...register("date_of_birth", { required: true })}
                            required
                        />
                    </div>
                </div>
                <div className='flex w-full mobiles:block'>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <SelectInput
                            label='ID Type'
                            options={idTypes}
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                            setFormValue={setValue}
                            {...register("id_type", { required: true })}
                            required
                        />
                    </div>
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='ID number'
                            name='id_number'
                            placeholder='Enter your ID number'
                            type='number'
                            {...register("id_number", { required: true })}
                            required
                        />
                    </div>
                </div>
                <div className='flex w-full mobiles:block'>
                

                    
                    <div className="my-auto">

                        <label
                            htmlFor="file-upload"
                            className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
                        >
                            Select Image
                        </label>

                        <input
                            id="file-upload"
                            className="hidden"
                            onChange={(e) => {
                                const [file] = e.target.files;
                                setImgFile(file);
                            }}
                            // ref={register}
                            ref={inpute => (inpute = fileInputRef)}
                            type="file"
                            accept=".png, .jpeg, .jpg"
                        />

                    </div>
                    {/*
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Upload Identification Document'
                            name='id_file'
                            // placeholder='10'\
                            {...register("id_file" 
                            // {
                            //     required: true,
                            // }
                            )}
                            type="file"
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                    */}
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='BVN'
                            name='bvn'
                            placeholder='Bank Verification Number'
                            type='number'
                            {...register("bvn", {
                                required: true,
                            })}
                            required
                        />
                    </div>

                </div>
                
                <div className='flex w-full mobiles:block'>
                
                    <div className='w-1/2 pr-5 mobiles:w-full mobiles:p-0'>
                        <InputField
                            label='Ownership Percentage'
                            name='ownership_percentage'
                            placeholder=''
                            type='text'
                            {...register("ownership_percentage", {
                                required: true,
                                minLength: 2,
                            })}
                            required
                        />
                    </div>
                </div>

                <div className='flex justify-between mt-10 signUp__submit-btn'>
                    <Link to='/onboard/step1'>
                        {/*
                        <button className='py-3 text-sm font-semibold bg-gray-100 rounded-md px-7 md:text-base'>
                            Go back
                        </button>
                        */}
                    </Link>
                    <Button type='submit' buttonText='Save' loading={loading} />
                </div>
            </form>
        </div>
    );
};

export default CompanyRepresentative;
