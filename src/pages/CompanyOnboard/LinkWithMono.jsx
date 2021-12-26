import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import OnboardSuccess from "./OnboardSuccess";
import { useMono } from "react-mono-js";

const LinkWithMono = () => {
  const [linked, setLinked] = useState(false);

  const handleMono = useMono({
    public_key: `${process.env.REACT_APP_MONO_PUBLIC_KEY}`,
  });
  return (
    <div>
      {!linked ? (
        <>
          <div className="text-2xl mb-10">Link account Details with MONO </div>
          <p>
            Companies who connect at least two bank account have chances of full
            payroll support.
          </p>
          <p>Mono doesn't have access to move your funds.</p>

          <div className="signUp__submit-btn mt-20 flex justify-start">
            <Button
              type="submit"
              buttonText="Connect Bank"
              onClick={() => {
                handleMono({
                  onClose: () => null,
                  onSuccess: (response) => {
                    console.log(response.code);
                    setLinked(true);
                  },
                });
              }}
            />
          </div>
        </>
      ) : (
        <OnboardSuccess />
      )}
    </div>
  );
};

export default LinkWithMono;
