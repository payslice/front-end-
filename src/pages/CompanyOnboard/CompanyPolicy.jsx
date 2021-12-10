import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";

const CompanyPolicy = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="text-2xl mb-10">Company Policy</div>
      <p>
        Kindly complete the steps below to activate your account, once you have
        complete all the required section, clicks on Request Activation
      </p>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex w-full">
          <div className="w-1/2 pr-5">
            <InputField
              label="Payroll size"
              name="Payroll size"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
          <div className="w-1/2 pr-5">
            <InputField
              label="Salary date (every month)"
              name="Company Name"
              placeholder="ABC Company"
              type="date"
              required
            />
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/2 pr-5">
            <InputField
              label="Withdrawn percentage %"
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
            onClick={() => history.push("/onboard/step4")}
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyPolicy;
