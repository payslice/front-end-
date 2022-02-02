import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { InputField, PasswordInput } from "../../../components/Input";
import successIcon from "../../../assets/svgs/success.svg";
import { resetPassword } from "../../../utils/ApiRequests";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [resetSuccess, setResetSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { [name]: value };
    setFormData({ ...formData, ...newFormData });
  };
  const history = useHistory();
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(formData);
    } catch (error) {
      toast.error("An error occured");
    }
  };
  return (
    <>
      {!resetSuccess ? (
        <div className="p-10 flex flex-col h-full justify-center w-3/4">
          <h1 className="text-3xl font-bold  uppercase">reset password</h1>

          <form onSubmit={submitForm}>
            <div className="mt_10">
              <InputField
                label="Enter email"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g Kelly@farfill.com"
              />
            </div>
            <div>
              <InputField
                label="Your Phone Number"
                required
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                type="tel"
                placeholder="+2348012345678"
              />
            </div>
            <div className="signUp__submit-btn flex justify-end">
              <Button type="submit" buttonText="Next" />
            </div>
          </form>
        </div>
      ) : (
        <div className="my-20 text-center">
          <div className="text-gray-500 uppercase text-2xl">
            your password has been changed
          </div>
          <img src={successIcon} alt="" className="mx-auto my-16" />

          <a href="/user/login" className="text-gray-500 hover:text-gray-500">
            Click here login
          </a>
        </div>
      )}
    </>
  );
};
