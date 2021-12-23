import React from "react";
import { useHistory } from "react-router-dom";

export const AuthMobileNav = () => {
  const history = useHistory();
  return (
    <div className="auth__mb-nav hidden mobiles:block pt-8 px-6 pb-5 w-full bg-white fixed">
      <img
        src={require("../assets/svgs/payslice-brand-id.svg").default}
        className="w-40 "
        alt="payslice-logo"
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};
