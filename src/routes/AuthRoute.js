import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
// import { SignUp } from "../pages/signup/SignUp";
import { ChooseUser } from "../pages/ChooseUser/ChooseUser";
import { SignUp } from "../pages/EmployeePages/Auth/EmployeeSignUp";
import { Login } from "../pages/EmployeePages/Auth/EmployeeLogin";
import { UserLogin } from "../pages/EmployeePages/Auth/Login";
import { OTPReset } from "../pages/EmployeePages/Auth/OTPReset";
import { ReferEmployer } from "../pages/Refer/ReferEmployer";
import { ResetPassword } from "../pages/EmployeePages/Auth/ResetPassword";
import { VerifyEmail } from "../pages/EmployeePages/Auth/VerifyEmail";
import { PasswordChanged } from "../pages/EmployeePages/Auth/PasswordChanged";
//added routes
import { UserInvite } from "../pages/EmployeePages/Auth/UserInvite";
import { UserOTPRequest } from "../pages/EmployeePages/Auth/UserOTPRequest";

export const AuthRoutesList = [
  { path: "/login", component: Login, exact: true },
  { path: "/", component: ChooseUser, exact: true },
  { path: "/choose-user", component: ChooseUser, exact: true },
  { path: "/register", component: SignUp, exact: true },
  { path: "/password", component: PasswordChanged, exact: true },
  { path: "/verify-email", component: VerifyEmail, exact: true },
  // { path: "/user/register", component: SignUp, exact: true },
  { path: "/user/login", component: UserLogin, exact: true },
  { path: "/reset-otp", component: OTPReset, exact: true },
  { path: "/reset-password", component: ResetPassword, exact: true },
  { path: "/invite", component: ReferEmployer, exact: true },
  { path: "/user/invite", component: UserInvite },
  { path: "/user/request_otp", component: UserOTPRequest },
];

const AuthRoutes = () => {
  return (
    <AuthLayout>
      <Switch>
        {AuthRoutesList.map((r) => (
          <Route component={r.component} path={r.path} exact={r.exact} />
        ))}
      </Switch>
    </AuthLayout>
  );
};

export default AuthRoutes;
