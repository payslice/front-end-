import React from "react";
import { Switch, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { SignUp } from "../pages/signup/SignUp";
import { ChooseUser } from "../pages/ChooseUser/ChooseUser";
import { Login } from "../pages/login/Login";

export const AuthRoutesList = [
  { path: "/login", component: Login, exact: true },
  { path: "/", component: ChooseUser, exact: true },
  { path: "/register", component: SignUp, exact: true },
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
