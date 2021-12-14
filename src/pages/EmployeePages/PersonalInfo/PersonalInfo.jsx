import React from "react";
import { InputField } from "../../../components/Input";

const PersonalInfo = () => {
  return (
    <div className="px-8">
      <div className="text-2xl my-4">Personal Information</div>

      <form>
        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label="Full name" type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="Email Address" type="email" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="Phone Number " type="tel" />
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label="Employees ID" type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="BVN" type="text" minLength="11" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="Location " type="text" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
