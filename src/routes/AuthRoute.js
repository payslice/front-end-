import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { SignUp } from "../pages/signup/SignUp";
import { ChooseUser } from "../pages/ChooseUser/ChooseUser";
import { Login } from "../pages/login/Login";
import { UserSignUp } from "../pages/EmployeePages/Auth/SignUp";
import { UserLogin } from "../pages/EmployeePages/Auth/Login";
import { OTPReset } from "../pages/EmployeePages/Auth/OTPReset";

export const AuthRoutesList = [
  { path: "/login", component: Login, exact: true },
  { path: "/", component: ChooseUser, exact: true },
  { path: "/register", component: SignUp, exact: true },
  { path: "/user/register", component: UserSignUp, exact: true },
  { path: "/user/login", component: UserLogin, exact: true },
  { path: "/user/reset-password", component: OTPReset, exact: true },
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
