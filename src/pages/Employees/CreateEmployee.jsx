import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import MiniLoader from "../../components/Loaders/MiniLoader";
import { ErrorMessage, SuccessMessage } from "../../components/Message/Message";
import { saveEmployee } from "../../utils/ApiRequests";
import axios from "axios";
import Select from "react-select";
import { CustomSelect } from "../../components/Select";

const CreateEmployee = () => {
  const initForm = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    employee_id: "AC/56",
    referral_link: "",
    gender: "",
    employment_type: "",
    contract_length: "",
    staff_salary: "",
    currency: "",
    location: "",
    account_name: "",
    account_number: "",
    bank_name: "",
    bank_code: "",
    // bvn: "22323123219",
  };
  const [formData, setFormData] = useState(initForm);
  const [fetchingBanks, setFetchingBanks] = useState(true);
  const [bankList, setBankList] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { [name]: value };
    setFormData({ ...formData, ...newFormData });
    setError(false);
    setSuccess(false);
  };

  useEffect(() => {
    const fetchBanks = async () => {
      const res = await axios.get("https://api.paystack.co/bank");

      const listBanks = res?.data.data?.map((bank) => {
        return {
          value: bank.code,
          label: bank.name,
        };
      });
      setBankList(listBanks);
      setFetchingBanks(false);
    };
    fetchBanks();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await saveEmployee({ ...formData });
      console.log("response", res);
      setLoading(false);
      setSuccess(true);
      setFormData(initForm);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrMessage("An error occured, please try again later.");
    }
  };

  return (
    <div>
      <div className="header">
        <h3 className="text-2xl mt-5">Create New Staff</h3>
        <p>
          We need some information about your staff to process your request.
        </p>
      </div>
      <div className="mt-5">
        <form onSubmit={submitForm}>
          <div className="flex w-full mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Staff first name"
                required
                name="first_name"
                placeholder="Staff first name "
                type="text"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Staff last name"
                required
                name="last_name"
                placeholder="Staff last name "
                type="text"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Email Address"
                required
                placeholder="Enter email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex w-full mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Phone Number "
                required
                placeholder="Staff full name "
                type="tel"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
              />
            </div>
            <div className="w-1/3 mr-5 mt-5 mobiles:w-full">
              <label htmlFor="" className="font-light text-normal">
                Staff Gender
              </label>
              <Select
                name="gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
                className="bg-gray-100 mt-2 custom-select-input"
                placeholder={formData.gender || "Select gender"}
                onChange={(val) => {
                  const { value } = val;
                  const e = {
                    target: {
                      name: "gender",
                      value: value,
                    },
                  };
                  handleChange(e);
                }}
              />
            </div>

            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Company Location"
                required
                placeholder="Staff full name "
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex w-full mobiles:block">
            <div className="w-1/3 mr-5 mt-5 mobiles:w-full">
              <label htmlFor="" className="font-light text-normal">
                Staff Bank Name
              </label>
              <Select
                name="bank_name"
                isLoading={fetchingBanks}
                options={bankList}
                className="bg-gray-100 mt-2 custom-select-input"
                placeholder={formData.bank_name || "Select bank"}
                onChange={(val) => {
                  const { label, value } = val;
                  const e = {
                    target: {
                      name: "bank_name",
                      value: label,
                    },
                  };
                  setFormData({
                    ...formData,
                    bank_name: label,
                    bank_code: value,
                  });
                  // handleChange(e);
                }}
              />
            </div>

            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Account Number "
                required
                placeholder="Enter account number"
                type="number"
                value={formData.account_number}
                name="account_number"
                onChange={handleChange}
              />
            </div>

            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Staff Account Name  "
                required
                placeholder="Staff full name "
                type="text"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex w-full mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                label="Salary (amount)"
                required
                placeholder="Staff full name "
                type="number"
                name="staff_salary"
                value={formData.staff_salary}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/3 mr-5 mt-5 mobiles:w-full">
              <label htmlFor="" className="font-light text-normal">
                Currency
              </label>
              <Select
                name="currency"
                options={[
                  { label: "NGN", value: "NGN" },
                  { label: "USD", value: "USD" },
                  { label: "GBP", value: "GBP" },
                  { label: "EUR", value: "EUR" },
                ]}
                className="bg-gray-100 mt-2 custom-select-input"
                placeholder={formData.currency || "Select currency"}
                onChange={(val) => {
                  const { value } = val;
                  const e = {
                    target: {
                      name: "currency",
                      value: value,
                    },
                  };
                  handleChange(e);
                }}
              />
            </div>

            <div className="w-1/3 mr-5 mt-5 mobiles:w-full">
              <label htmlFor="" className="font-light text-normal">
                Employment type
              </label>
              <Select
                name="employment_type"
                options={[
                  { label: "Full time", value: "full time" },
                  { label: "Contract", value: "contract" },
                  { label: "Part time", value: "part time" },
                  { label: "Intern", value: "intern" },
                ]}
                className="bg-gray-100 mt-2 custom-select-input"
                placeholder={formData.employment_type || "Select type"}
                onChange={(val) => {
                  const { value } = val;
                  const e = {
                    target: {
                      name: "employment_type",
                      value: value,
                    },
                  };
                  handleChange(e);
                }}
              />
            </div>
          </div>
          {formData.employment_type === "contract" && (
            <div className="flex w-full mobiles:block">
              <div className="w-1/3 mr-5 mobiles:w-full">
                <InputField
                  label="Contract length (in months)"
                  required
                  placeholder="Enter contract length"
                  type="number"
                  name="contract_length"
                  value={formData.contract_length}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="mt-5">
            {loading ? (
              <MiniLoader />
            ) : (
              <Button
                type="submit"
                className="mobiles:w-full"
                buttonText="Send invitation"
              />
            )}
          </div>
        </form>
        {success && (
          <SuccessMessage
            title="Registration Complete"
            message="Employee account has been created successfully and an invite has been sent to their email."
          />
        )}
        {error && <ErrorMessage title="Error" message={errMessage} />}
      </div>
    </div>
  );
};
export default CreateEmployee;
