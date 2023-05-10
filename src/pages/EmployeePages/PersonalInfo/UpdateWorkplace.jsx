/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { InputField } from "../../../components/Input";
import avatar from "../../../assets/svgs/Teacher.svg";
import { Button } from "../../../components/Button/Button";
import {
  removeUserDataFromStorage,
  setuserDataToStorage,
  getUserDataFromStorage,
} from "../../../utils/ApiUtils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { persistSelector } from "../../../slices/persist";
import { useForm } from "react-hook-form";
import { UpdateWorkplaceData } from "../../../utils/ApiRequests";
import { Link } from "react-router-dom/cjs/react-router-dom";

const UpdateWorkplace = () => {
  const { user } = useSelector(persistSelector);

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false)

  const [imgFile, setImgFile] = useState();

  const {
    employee_id,
    bank_code,
    email,
    phone,
    account_number,
    beneficiary_name,
  } = user;

  const [formData, setFormData] = useState({
    ...user,
    employee_id: employee_id,
    bank_code: bank_code,
    email: email,
    phone: phone,
    account_number: account_number,
    beneficiary_name: beneficiary_name,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (type, e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    type ? (newFormData[type][name] = value) : (newFormData[name] = value);
    setFormData(newFormData);
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await UpdateWorkplace(formData);
      if (data.status === true) {
        removeUserDataFromStorage();
        setuserDataToStorage(data.data);
        setSubmitting(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
      setSubmitting(false);
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

      <div className="text-2xl my-4">Update Workplace</div>

      <form onSubmit={handleSubmit(updateUserInfo)}>
        <div className="w-full flex mobiles:block">
          <div className="w-1/3 mr-5 mobiles:w-full">
            <InputField
              required
              label="employee_id"
              value={formData.employee_id}
              disabled
              type="text"
              name="employee_id"
              onChange={(e) => handleChange(null, e)}
            />
          </div>
          <div className="w-1/3 mr-5 mobiles:w-full">
            <InputField
              required
              label="Bank code"
              value={formData.bank_code}
              disabled
              type="string"
            />
          </div>
          <div className="w-1/3 mr-5 mobiles:w-full">
            <InputField
              required
              label="email"
              value={formData.email}
              type="email"
              name="email"
              onChange={(e) => handleChange(null, e)}
            />
          </div>
        </div>

        <div className="w-full flex mobiles:block">
          <div className="w-1/3 mr-5 mobiles:w-full">
            <InputField
              label="Phone number"
              value={formData.phone}
              type="number"
            />
          </div>
          <div className="w-1/3 mr-5 mobiles:w-full">
            <InputField
              required
              label="Account Number"
              value={formData.account_number}
              type="number"
              name="account_number"
              onChange={(e) => handleChange(null, e)}
            />
          </div>
          
          <div className="w-1/3 mr-5 mobiles:w-full">
            <InputField
              required
              label="Beneficiary name"
              name="location"
              value={formData.beneficiary_name}
              type="string"
            />
          </div>
        </div>

        <Button buttonText="Update Details" loading={loading}  />
      </form>
    </div>
  );
};

export default UpdateWorkplace;
