import React from "react";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";

const AddStaff = () => {
  return (
    <div className="w-2/4 justify-center m-auto">
      <BackButton />

      <div className="header">
        <h2 className="text-2xl">Add staff </h2>
        <p>you can c-level staff </p>
      </div>
      <div className="payment-form ">
        <InputField
          label="Email"
          type="email"
          required
          placeholder="abc@xyz.com"
        />
        <InputField
          label="Full name"
          type="text"
          required
          placeholder="Enter full name "
        />
        <div className="flex justify-end">
          <Button buttonText="Send invite" />
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
