import React from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import { CustomSelect } from "../../components/Select";

const LegalInfo = () => {
  return (
    <div className="my-5">
      <h2 className="text-2xl">Company legal infomation</h2>

      <div className="my-8">
        <form>
          <div className="w-full flex">
            <div className="w-1/3 mr-5">
              <InputField
                label="Companyy Name"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Payment email"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="RC Number "
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-1/3 mr-5">
              <InputField
                label="TIN number"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Number of Employees"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5">
              <InputField
                label="Total Payroll Size  "
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-2/3">
              <InputField
                label="Business Address"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <Button type="submit" buttonText="update  changes" />
        </form>

        <div className="text-xl mt-8">Policy Info</div>
        <div className="__policy-form mb-8">
          <form>
            <div className="flex">
              <div className="w-1/3 mr-5">
                <InputField
                  type="date"
                  label="Salary Date (Every month)"
                  placeholder="choose date"
                  required
                />
              </div>
              <div className="w-1/3 mr-5 mt-5">
                <CustomSelect
                  options={["50%", "100%"]}
                  label="Salary withdrawel (%)"
                  initValue="Select option"
                />
              </div>
              <div className="w-1/3 mr-5 mt-5">
                <CustomSelect
                  options={["Bt Employee", "By Employer"]}
                  label="Payment fees"
                  initValue="Select option"
                />
              </div>
            </div>
            <div className="mt-5">
              <Button type="submit" buttonText="update  changes" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LegalInfo;
