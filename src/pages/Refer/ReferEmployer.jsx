import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField, PasswordInput } from "../../components/Input";

export const ReferEmployer = () => {
  const history = useHistory();
  const submitForm = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <>
      <div className="p-10 w-3/4 mobiles:w-full mobiles:p-0 mobiles:mt-20">
        <h1 className="text-3xl uppercase">refer your employer</h1>
        <small>You can choose to remain anonymous</small>

        <form onSubmit={submitForm}>
          <div className="mt_10">
            <InputField
              label="Your Companies Name"
              required
              type="text"
              placeholder="e.g Kelly Now "
            />
            <InputField
              label="Contact person Email"
              required
              type="email"
              placeholder="e.g Kelly@farfill.com"
            />
            <InputField
              label="Your Email"
              required
              type="email"
              placeholder="e.g Kelly@farfill.com"
            />
            <InputField
              label="Your Phone Number"
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
        <div className="mt-3">
          Already have an account <a href="/user/login">Login</a>{" "}
        </div>
      </div>
    </>
  );
};
