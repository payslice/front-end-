import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import { companyPolicy } from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import MiniLoader from "../../components/Loaders/MiniLoader";
import { ErrorMessage } from "../../components/Message/Message";

const CompanyPolicy = () => {
  const [formData, setFormData] = useState({
    company_id: "",
    salary_date: "",
    salary_withdrawal_percentage: "",
    payroll_size: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newFormData = { [name]: value };
    setFormData({ ...formData, ...newFormData });
    setErrMessage("");
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyId = "3898829ccaty89";
    const payload = { ...formData, company_id: companyId };
    setLoading(true);
    try {
      await companyPolicy(payload);
      setLoading(false);
      history.push("/onboard/step4");
    } catch (error) {
      toast.error("An error occured");
      setError(true);
      // console.log(error.response.data.payload.data);
      setLoading(false);
      setErrMessage(error.response.data.payload.data);
    }
  };
  return (
    <div>
      <div className="text-2xl mb-10">Company Policy</div>
      <p>
        Kindly complete the steps below to activate your account, once you have
        complete all the required section, clicks on Request Activation
      </p>

      {error && <ErrorMessage title="Error" message={errMessage} />}
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
            <div className="mt-5">
              <label>Salary date (every month)</label>
              <div className="select-pay mb-5 mt-2">
                <select
                  onChange={handleChange}
                  name="salary_date"
                  className="bg-gray-200 px-5 py-3 w-full rounded "
                >
                  <option value="">Select option</option>
                  <option value="first_week">First Week</option>
                  <option value="second_week">Second Week</option>
                  <option value="last_week"> Last Week</option>
                </select>
              </div>
            </div>
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
          {loading ? (
            <MiniLoader />
          ) : (
            <Button type="submit" buttonText="Save" />
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyPolicy;
