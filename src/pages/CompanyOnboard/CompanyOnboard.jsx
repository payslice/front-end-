import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";

const CompanyOnboard = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const history = useHistory();
  return (
    <div>
      <div className="text-2xl mb-10">Company onboarding process</div>
      <p>
        Kindly complete the steps below to activate your account, once you have
        complete all the required section, clicks on Request Activation
      </p>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex w-full">
          <div className="w-1/2 pr-5">
            <InputField
              label="Company Name"
              name="Company Name"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
          <div className="w-1/2 pr-5">
            <InputField
              label="Tax Identification Number"
              name="Company Name"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 pr-5">
            <InputField
              label="RC Number"
              name="RC Number"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
          <div className="w-1/2 pr-5">
            <InputField
              label="Business Address"
              name="Company Name"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 pr-5">
            <InputField
              label="Industry"
              name="RC Number"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
          <div className="w-1/2 pr-5">
            <InputField
              label="Business Phone Number"
              name="Business Phone Number"
              placeholder="+2349012345678"
              type="tel"
              required
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 pr-5">
            <InputField
              label="Payment Email"
              name="Payment Email"
              placeholder="ABC Company"
              type="email"
              required
            />
          </div>
        </div>
        <div className="signUp__submit-btn flex justify-end">
          <Button
            type="submit"
            buttonText="Save"
            onClick={() => history.push("/onboard/step2")}
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyOnboard;
