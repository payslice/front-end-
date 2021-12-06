import React from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";

const LinkWithMono = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="text-2xl">Link account Details with MONO </div>
      <p>
        Companies who connect atleast two bank account have chances of full
        payroll support.
      </p>
      <p>Naira or Mono doesn't have access to move your funds.</p>

      <div className="signUp__submit-btn flex justify-start">
        <Button type="submit" buttonText="Connect Bank" />
      </div>
    </div>
  );
};

export default LinkWithMono;
