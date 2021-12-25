import React from "react";
import AppLayout from "../layout/AppLayout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
import { Login } from "../pages/login/Login";
import AuthLayout from "../layout/AuthLayout";
import { SignUp } from "../pages/signup/SignUp";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import { ChooseUser } from "../pages/ChooseUser/ChooseUser";
import { UserSignUp } from "../pages/EmployeePages/Auth/SignUp";
import { UserLogin } from "../pages/EmployeePages/Auth/Login";
import { OTPReset } from "../pages/EmployeePages/Auth/OTPReset";
import UserDashboard from "../pages/EmployeePages/Dashboard";
import Withdrawals from "../pages/EmployeePages/Withdrawals/Withdrawals";
import TimeAttendance from "../pages/EmployeePages/Attendance/TimeAttendance";
import PersonalInfo from "../pages/EmployeePages/PersonalInfo/PersonalInfo";
import BankingInfo from "../pages/EmployeePages/PersonalInfo/BankingInfo";
import WithdrawFunds from "../pages/EmployeePages/Withdrawals/WithdrawFunds";
import CompanyOnboardRoutes from "./CompanyOnboardRoutes";
import EmployerRoutes from "./EmployerRoutes";

const DashboardLayout = ({ child, navTab }) => {
  return <AppLayout navTab={navTab}>{child()}</AppLayout>;
};

const userInfoNavTab = [
  {
    name: "Personal Infomation",
    link: "/user/settings",
  },
  {
    name: "Banking Information",
    link: "/user/settings/banking",
  },
];

const Directory = () => {
  return (
    <>
      {/* <Router> */}
      <Switch>
        <Route
          path="/user/dashboard"
          render={() => <DashboardLayout child={UserDashboard} />}
          exact
        />
        <Route
          path="/user/withdrawals"
          render={() => <DashboardLayout child={Withdrawals} />}
          exact
        />
        <Route
          path="/user/withdrawals/withdraw"
          render={() => <DashboardLayout child={WithdrawFunds} />}
          exact
        />
        <Route
          path="/user/attendance"
          render={() => <DashboardLayout child={TimeAttendance} />}
          exact
        />
        <Route
          path="/user/settings"
          render={() => (
            <DashboardLayout navTab={userInfoNavTab} child={PersonalInfo} />
          )}
          exact
        />
        <Route
          path="/user/settings/banking"
          render={() => (
            <DashboardLayout navTab={userInfoNavTab} child={BankingInfo} />
          )}
          exact
        />
      </Switch>
      <CompanyOnboardRoutes />
      {/* <AuthPageLayout /> */}
      <EmployerRoutes />

      {/* </Router> */}
    </>
  );
};

export default Directory;
