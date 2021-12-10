import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import OnboardSuccess from "./OnboardSuccess";

const LinkWithMono = () => {
  const [linked, setLinked] = useState(false);

  return (
    <div>
      {!linked ? (
        <>
          <div className="text-2xl mb-10">Link account Details with MONO </div>
          <p>
            Companies who connect atleast two bank account have chances of full
            payroll support.
          </p>
          <p>Naira or Mono doesn't have access to move your funds.</p>

          <div className="signUp__submit-btn mt-20 flex justify-start">
            <Button
              type="submit"
              buttonText="Connect Bank"
              onClick={() => setLinked(true)}
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
