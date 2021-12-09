import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, PasswordInput } from "../../components/Input";

export const Login = () => {
  const history = useHistory();
  const submitForm = (e) => {
    e.preventDefault();
    history.push("/onboard/step1");
  };
  return (
    <>
      <div className="p-10 flex flex-col h-full justify-center w-3/4">
        <h1 className="text-3xl font-bold  uppercase">login</h1>

        <form onSubmit={submitForm}>
          <div className="mt_10">
            <InputField
              label="Business Email Address"
              required
              type="email"
              placeholder="e.g Kelly@farfill.com"
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
