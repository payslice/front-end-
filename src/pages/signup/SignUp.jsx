import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, PasswordInput } from "../../components/Input";

export const SignUp = () => {
  const history = useHistory();
  const submitForm = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <>
      <div className="p-10 w-3/4">
        <h1 className="text-3xl font-bold  uppercase">sign up</h1>

        <form onSubmit={submitForm}>
          <div className="mt_10">
            <InputField
              label="Full Name "
              required
              type="text"
              placeholder="e.g Kelly Now "
            />
            <InputField
              label="Business Email Address"
              required
              type="email"
              placeholder="e.g Kelly@farfill.com"
            />
            <InputField
              label="Phone Number"
              required
              type="phone"
              placeholder="+2348012345678"
            />
            <PasswordInput
              required
              label="Enter password"
              placeholder="Enter password"
            />
          </div>
          <div className="signUp__submit-btn flex justify-end">
            <Button type="submit" buttonText="Next" />
          </div>
        </form>
      </div>
    </>
  );
};
