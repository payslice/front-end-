import React, { useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import { CustomSelect } from "../../components/Select";
import { getAllCompanyPolicy, getCompanyPolicy } from "../../utils/ApiRequests";

const LegalInfo = () => {
  useEffect(() => {
    const getPolicy = async () => {
      try {
        const res = await getAllCompanyPolicy();
        console.log("res", res);
      } catch (error) {
        console.log("err", error);
      }
    };
    getPolicy();
  }, []);

  return (
    <div className="my-5">
      <h2 className="text-2xl">Company legal infomation</h2>

      <div className="my-8">
        <form>
          <div className="w-full flex mobiles:block">
            <div className="w-1/3 mobiles:w-full mr-5 mobiles:mr-0">
              <InputField
                label="Companyy Name"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="Payment email"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="RC Number "
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="TIN number"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="Number of Employees"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="Total Payroll Size  "
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex mobiles:block">
            <div className="w-2/3 mobiles:w-full">
              <InputField
                label="Business Address"
                required
                placeholder="Staff full name "
                type="text"
              />
            </div>
          </div>
          <Button type="submit" buttonText="Update  changes" />
        </form>

        <div className="text-xl mt-8">Policy Info</div>
        <div className="__policy-form mb-8">
          <form>
            <div className="flex mobiles:block">
              <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
                <InputField
                  type="date"
                  label="Salary Date (Every month)"
                  placeholder="choose date"
                  required
                />
              </div>
              <div className="w-1/3 mr-5 mt-5 mobiles:w-full mobiles:mr-0">
                <CustomSelect
                  options={["50%", "100%"]}
                  label="Salary withdrawel (%)"
                  initValue="Select option"
                />
              </div>
              <div className="w-1/3 mr-5 mt-5 mobiles:w-full mobiles:mr-0">
                <CustomSelect
                  options={["Bt Employee", "By Employer"]}
                  label="Payment fees"
                  initValue="Select option"
                />
              </div>
            </div>
            <div className="mt-5">
              <Button type="submit" buttonText="Update  changes" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LegalInfo;
