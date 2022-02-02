import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, PasswordInput } from "../../components/Input";
import MiniLoader from "../../components/Loaders/MiniLoader";
import { SuccessMessage, ErrorMessage } from "../../components/Message/Message";
import { employerRegister } from "../../utils/ApiRequests";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    gender: "male",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState();

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { [name]: value };
    setFormData({ ...formData, ...newFormData });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await employerRegister(formData);

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrMessage("An error occured, please try again later.");
    }
  };

  return (
    <>
      <div className="p-10 flex flex-col h-full justify-center w-3/4 mobiles:w-full mobiles:block mobiles:mt-28 mobiles:p-0 mobiles:h-0">
        <h1 className="text-3xl font-bold  uppercase">sign up</h1>

        <form onSubmit={submitForm}>
          <div className="mt_10">
            <InputField
              label="First name"
              name="first_name"
              required
              onChange={handleChange}
              type="text"
              placeholder="e.g Kelly Now "
            />
            <InputField
              label="Last name"
              name="last_name"
              required
              type="text"
              onChange={handleChange}
              placeholder="e.g Kelly Now "
            />
            <InputField
              label="Business Email Address"
              required
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="e.g Kelly@farfill.com"
            />
            <InputField
              label="Phone Number"
              required
              name="phone_number"
              type="phone"
              onChange={handleChange}
              placeholder="+2348012345678"
            />
            <PasswordInput
              required
              name="password"
              label="Enter password"
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <div className="signUp__submit-btn flex justify-end">
            {loading ? (
              <MiniLoader />
            ) : (
              <Button type="submit" buttonText="Next" />
            )}
          </div>
        </form>
        <div className="mt-5 pb-10 ">
          Already have an account? <a href="/login">Login</a>
        </div>

        {success && (
          <SuccessMessage
            title="Registration Complete"
            message="Thank you for sigining up, check your email to complete your
registration."
          />
        )}
        {error && <ErrorMessage title="Error" message={errMessage} />}
      </div>
    </>
  );
};
