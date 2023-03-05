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

const UpdateWorkplace = () => {
  const { user } = useSelector(persistSelector);

  const { register, handleSubmit } = useForm();

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
          <div className="w-1/3 mr-5">
            <InputField
              required
              label="Account Number"
              // onChange={(e) => handleChange("bankDetails", e)}
              value={formData.account_number}
              type="number"
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
      </form>
    </div>
  );
};

export default UpdateWorkplace;
