import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button/Button";
import { InputField } from "../../../components/Input";
import { saveKyc, userData } from "../../../utils/ApiRequests";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const maritalStatusData = [
  { id: 5543, name: "Single", value: "single" },
  { id: 14477, name: "Married", value: "married" },
  { id: 9654, name: "Divorced", value: "divorced" },
  { id: 3241, name: "Widowed", value: "widowed" },
  { id: 7769, name: "Separated", value: "separated" },
];

const idTypeData = [
  { id: 1775, name: "NIN", value: "nin" },
  { id: 5411, name: "PVC", value: "pvc" },
  { id: 9766, name: "Passport", value: "passport" },
];

const Kyc = () => {
        const { id, kycDetails } = userData;

        const { register, handleSubmit } = useForm();

        const [loading, setLoading] = useState(false);

        const [imgFile, setImgFile] = useState();
        const [imgFile2, setImgFile2] = useState();

        const onSubmit = async (onSubmit) => {
                setLoading(true);
                let formdata = new FormData()
                formdata.append("file", imgFile)
                formdata.append("picture", imgFile2)

                formdata.append("marital_status", onSubmit.marital_status)
                formdata.append("address", onSubmit.address)
                formdata.append("id_type", onSubmit.id_type)
                // formdata.append("bvn", onSubmit.onSubmit)
                try {
                        const { data } = await saveKyc(formdata);
                        if (data.status === 200) {
                                // toast.success("next of kin user saved")
                                toast.success(data.message)
                        }
                        else {
                                toast.error(data.message)
                        }
                        setLoading(false);
                } catch (error) {
                        setLoading(false);
                        toast.error("data not created");
                }
        };

        return (
                <div className="px-8">

                <Link to="/user/dashboard">
                <div className="lg:hidden flex mt-5">
                <svg className="mt-12" style={{marginTop: '5px'}} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99182 10.5734L3.16183 6.2472L7.47744 1.40778L5.99065 0.0790062L0.336276 6.40578L6.66305 12.0602L7.99182 10.5734Z" fill="#737A91"/>
                </svg>
                <span className="font-normal text-base pl-5" style={{}} >
                        Go back
                </span>
                </div>

                 </Link>
                        <div className="text-2xl my-4">KYC</div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="w-full flex mobiles:block">
                                        <div className="w-1/3 mr-5 mobiles:w-full mt-5">
                                                <div>
                                                <label className="text-normal text-sm md:text-base font-medium relative">
                                                        Marital Status
                                                        <span
                                                        style={{
                                                        color: "red",
                                                        width: "40px",
                                                        marginLeft: "20px",
                                                        marginTop: "-2px",
                                                        }}
                                                        className="absolute text-3xl md:text-5xl w-10 md:ml-5 -mt-0.5 text-rose-600"
                                                        >
                                                        *
                                                        </span>
                                                </label>
                                                <div className="select-pay mb-5 mt-2">
                                                        <select
                                                        {...register("marital_status", { required: true })}
                                                        name="marital_status"
                                                        className="bg-gray-100 px-5 py-5 w-full rounded"
                                                        >
                                                        <option value=""></option>
                                                        {maritalStatusData.map(({ id, name, value }) => (
                                                        <option value={value} key={id}>
                                                        {name}
                                                        </option>
                                                        ))}
                                                        </select>
                                                </div>
                                                </div>
                                        </div>

                                        <div className="w-1/3 mr-5 mobiles:w-full">
                                                <InputField
                                                required
                                                label="Address"
                                                {...register("address", { required: true })}
                                                value={kycDetails?.address}
                                                type="text"
                                                />
                                        </div>

                                        <div className="w-1/3 mr-5 mobiles:w-full mt-5">
                                        <div>
                                        <label className="text-normal text-sm md:text-base font-medium relative">
                                                ID Type
                                                <span
                                                style={{
                                                color: "red",
                                                width: "40px",
                                                marginLeft: "20px",
                                                marginTop: "-2px",
                                                }}
                                                className="absolute text-3xl md:text-5xl w-10 md:ml-5 -mt-0.5 text-rose-600"
                                                >
                                                *
                                                </span>
                                        </label>
                                        <div className="select-pay mb-5 mt-2">
                                                <select
                                                {...register("id_type", { required: true })}
                                                name="id_type"
                                                className="bg-gray-100 px-5 py-5 w-full rounded"
                                                >
                                                <option value=""></option>
                                                {idTypeData.map(({ id, name, value }) => (
                                                <option value={value} key={id}>
                                                {name}
                                                </option>
                                                ))}
                                                </select>
                                        </div>
                                        </div>
                                        </div>
                                        </div>

                                        <div className="w-full flex mobiles:block">            
                                                <div className="w-1/3 mr-5 mobiles:w-full">
                                                <InputField required label="BVN" {...register('bvn', {required: true})} value={kycDetails?.bvn} type="number" />
                                                </div>
                                                <div className="w-1/3 mr-5 mobiles:w-full">
                                                <InputField
                                                required
                                                label="Upload ID"
                                                {...register("file", { required: true })}
                                                value={kycDetails?.file}
                                                id="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                        const [file] = e.target.files;
                                                        setImgFile(file);
                                                }}
                                                type="file"
                                                accept=".png, .jpeg, .jpg"
                                                />
                                                </div>

                                                <div className="w-1/3 mr-5 mobiles:w-full">
                                                <InputField
                                                required
                                                label="Profile Picture"
                                                {...register("profile_picture", { required: true })}
                                                value={kycDetails?.profile_picture}
                                                id="profile_picture"
                                                className="hidden"
                                                onChange={(e) => {
                                                        const [file] = e.target.files;
                                                        setImgFile2(file);
                                                }}
                                                type="file"
                                                accept=".png, .jpeg, .jpg"
                                                />
                                                </div>
                                        </div>
                                <Button buttonText="Update Details" loading={loading} />
                        </form>
                </div>
        );
};

export default Kyc;
