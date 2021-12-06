import React from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";

const CreateEmployee = () => {
  return (
    <div>
      <div className="header">
        <h3 className="text-2xl mt-5">Create New Staff</h3>
        <p>
          We need some information about your staff to process your request.
        </p>
      </div>
      <div className="mt-5">
        <form>
          <div className="flex w-full">
            <div className="w-1/3 mr-5">
              <InputField
                label="Staff full name"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Email Address"
                required
                placeholder=""
                type="email"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Phone Number "
                required
                placeholder="Staff full name "
                type="tel"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3 mr-5">
              <InputField
                label="Choose Staff Bank Name "
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Account Number "
                required
                placeholder=""
                type="email"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Staff Account Name  "
                required
                placeholder="Staff full name "
                type="number"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3 mr-5">
              <InputField
                label="Salary (amount)"
                required
                placeholder="Staff full name "
                type="number"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Currency"
                required
                placeholder=""
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Location"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3 mr-5 ">
              <InputField
                label="Employment type"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Contract length "
                required
                placeholder=""
                type="text"
              />
            </div>
          </div>
          <div className="mt-5">
            <Button type="submit" buttonText="Send invitation" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateEmployee;
