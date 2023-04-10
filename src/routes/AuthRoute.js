import React, { createContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
// import { SignUp } from "../pages/signup/SignUp";
import { ChooseUser } from "../pages/ChooseUser/ChooseUser";
import { EmployeeSignUp } from "../pages/EmployeePages/Auth/EmployeeSignUp";
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
import { BusinessLogin } from "../pages/Business/Login";
import { BusinessSignup } from "../pages/Business/Signup";


export const AuthRoutesList = [
  { path: "/login", component: Login, exact: true, key: 'FDGHJK' },
  { path: "/business/login", component: BusinessLogin, exact: true, key: 'FDGHJasK' },
  { path: "/business/register", component: BusinessSignup, exact: true, key: 'FDGasdHJasK' },
  { path: "/", component: ChooseUser, exact: true, key: 'ghjkhlh' },
  { path: "/choose-user", component: ChooseUser, exact: true, key: 'ghjgjjkjgh' },
  { path: "/password", component: PasswordChanged, exact: true, key: 'ghjkhg' },
  { path: "/verify-email", component: VerifyEmail, exact: true, key: 'jhgkjh' },
  { path: "/user/register", component: EmployeeSignUp, exact: true, key: 'ghjkhjk' },
  { path: "/user/login", component: UserLogin, exact: true, key: 'hjgkhjhkh' },
  { path: "/reset-otp", component: OTPReset, exact: true, key: 'trfjkhj' },
  { path: "/reset-password", component: ResetPassword, exact: true, key: 'yiterrejhbm' },
  { path: "/invite", component: ReferEmployer, exact: true, key: 'yiterrjhbm' },
  { path: "/user/invite", component: UserInvite, exact: true, key: 'yierrejhbm' },
  { path: "/user/request_otp", component: UserOTPRequest, exact: true, key: 'yterrejhbm' },
];

export const emailContext = createContext('')

const AuthRoutes = () => { 

  const [emailState, setEmailState] = useState('email@email.com')

  return (

    <emailContext.Provider value={{emailState, setEmailState}}>
    <AuthLayout>
      <Switch>
        {AuthRoutesList.map((r) => (
          <Route component={r.component} path={r.path} exact={r.exact} key={r.key} />
        ))}
      </Switch>
    </AuthLayout>
    </emailContext.Provider>
  );
};

export default AuthRoutes;
