import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import { InputField, PasswordInput } from "../../../components/Input";
import MiniLoader from "../../../components/Loaders/MiniLoader";
import { employeeLogin } from "../../../utils/ApiRequests";
import {
  setTokenToStorage,
  setuserDataToStorage,
} from "../../../utils/ApiUtils";
import { toast } from "react-toastify";

export const UserLogin = () => {
  const history = useHistory();

  const [loginForm, setLoginForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newFormData = { [name]: value };
    setLoginForm({ ...loginForm, ...newFormData });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await employeeLogin(loginForm);
      setTokenToStorage(res.data.payload.data.token);
      setuserDataToStorage(res.data.payload.data);
      setLoading(false);
      history.push("/user/dashboard");
    } catch (error) {
      toast.error("An error occured, ensure details are correct");
      setLoading(false);
      // console.log("error", error.response.data.payload.data);
      setError(true);
    }
  };
  return (
    <>
      <div className="p-10 flex flex-col h-full justify-center w-3/4 mobiles:w-full mobiles:block mobiles:mt-28 mobiles:p-0 mobiles:h-0">
        <h1 className="text-3xl font-bold  uppercase">login</h1>

        <form onSubmit={submitForm}>
          <div className="mt_10">
            <InputField
              label="Email Address or Employee ID"
              required
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="e.g Kelly@farfill.com"
            />
            <PasswordInput
              required
              label="Enter password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
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
        <div className="mt-16">
          Don't have an account? <a href="/user/register">Sign Up now</a>
        </div>
      </div>
    </>
  );
};
