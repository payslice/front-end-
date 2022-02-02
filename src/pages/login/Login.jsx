import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, PasswordInput } from "../../components/Input";
import { employerLogin } from "../../utils/ApiRequests";
import {
  setExpiryTimeToStorage,
  setTokenToStorage,
  setuserDataToStorage,
} from "../../utils/ApiUtils";
import { toast } from "react-toastify";
import MiniLoader from "../../components/Loaders/MiniLoader";
import { ErrorMessage } from "../../components/Message/Message";

export const Login = () => {
  const [loginForm, setLoginForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newEntry = { [name]: value };
    setLoginForm({ ...loginForm, ...newEntry });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await employerLogin(loginForm);
      setuserDataToStorage(res.data.payload.data);
      setTokenToStorage(res.data.payload.data.token);
      setExpiryTimeToStorage(new Date());
      setLoading(false);
      res.data.payload.data.company
        ? history.push("/dashboard")
        : history.push("/onboard/step1");
    } catch (error) {
      toast.error("An error occured, please try again");
      setLoading(false);
      // console.log("error", error);
      setError(true);
    }
  };

  return (
    <>
      <div className="p-10 mobiles:p-0 flex flex-col mobiles:block mobiles:mt-28 mobiles:h-0 h-full justify-center w-3/4 mobiles:w-full">
        <h1 className="text-3xl font-bold uppercase">login</h1>
        {error && (
          <ErrorMessage
            title="Error"
            message="An error occured. Please ensure your email and password is correct."
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt_10">
            <InputField
              label="Business Email Address"
              required
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="e.g Kelly@farfill.com"
            />
            <PasswordInput
              label="Enter password"
              name="password"
              required
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

        <div className="mt-16">
          Don't have an account? <a href="/register">Sign Up now</a>
        </div>
      </div>
    </>
  );
};
