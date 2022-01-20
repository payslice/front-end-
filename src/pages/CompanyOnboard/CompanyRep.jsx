import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import { useForm } from "@formspree/react";
import { ErrorMessage, SuccessMessage } from "../../components/Message/Message";
import MiniLoader from "../../components/Loaders/MiniLoader";

const CompanyRepresentative = () => {
  const [state, handleSubmit] = useForm("myyozeez");
  const history = useHistory();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
  useEffect(() => {
    if (state.succeeded) {
      setTimeout(history.push("/onboard/step3"), 3000);
    }
  }, [state, history]);

  // console.log("state", state);
  return (
    <div>
      <div className="text-2xl mb-10">Company Representative</div>
      <p>
        Kindly complete the steps below to activate your account, once you have
        complete all the required section, clicks on Request Activation
      </p>
      {state.succeeded && (
        <SuccessMessage
          title="Success"
          message="Company representative registration successfull."
        />
      )}
      {state.errors.length > 0 && (
        <ErrorMessage
          title="Error"
          message="An error occured while trying to complete your submission, please try again."
        />
      )}

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="flex w-full mobiles:block">
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Legal name"
              name="legal_name"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Address"
              name="address"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex w-full mobiles:block">
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Date of birth"
              name="RC Number"
              placeholder="ABC Company"
              type="date"
              required
            />
          </div>
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="ID Type"
              name="ID Type"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
        </div>
        <div className="flex w-full mobiles:block">
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="ID number"
              name="ID number"
              placeholder="ABC Company"
              type="number"
              required
            />
          </div>
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Ownership percentage"
              name="Ownership percentage"
              placeholder="+2349012345678"
              type="tel"
              required
            />
          </div>
        </div>
        <div className="flex w-full mobiles:block">
          <div className="w-1/2 pr-5 mobiles:w-full mobiles:p-0">
            <InputField
              label="Title (if a senior manager)"
              name="Payment Email"
              placeholder="ABC Company"
              type="text"
              required
            />
          </div>
        </div>
        <div className="signUp__submit-btn flex justify-end">
          {state.submitting ? (
            <MiniLoader />
          ) : (
            <Button type="submit" buttonText="Save" />
          )}
        </div>
      </form>
    </div>
  );
};

export default CompanyRepresentative;
