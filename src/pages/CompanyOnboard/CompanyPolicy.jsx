import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import { companyPolicy } from "../../utils/ApiRequests";
import { toast } from "react-toastify";

const CompanyPolicy = () => {
  const [formData, setFormData] = useState({
    company_id: "",
    salary_date: "",
    salary_withdrawal_percentage: "",
    payroll_size: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newFormData = { [name]: value };
    setFormData({ ...formData, ...newFormData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyId = sessionStorage.getItem("P_Slice_CID");
    const payload = { ...formData, company_id: companyId };

    try {
      const res = await companyPolicy(payload);
      console.log("response", res.data);
    } catch (error) {
      toast.error("An error occured");
      console.log(error, "error");
    }
  };
  return (
    <div>
      <div className="text-2xl mb-10">Company Policy</div>
      <p>
        Kindly complete the steps below to activate your account, once you have
        complete all the required section, clicks on Request Activation
      </p>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex w-full mobiles:block">
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Payroll size"
              name="payroll_size"
              placeholder="Enter payroll size"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Salary date (every month)"
              name="salary_date"
              placeholder=""
              type="date"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex w-full mobiles:block">
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Withdrawn percentage %"
              name="salary_withdrawal_percentage"
              placeholder="20"
              type="number"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="signUp__submit-btn flex justify-end">
          <Button type="submit" buttonText="Save" />
        </div>
      </form>
    </div>
  );
};

export default CompanyPolicy;
