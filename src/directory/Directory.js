import React from "react";
import AppLayout from "../layout/AppLayout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
import { Login } from "../pages/login/Login";
import AuthLayout from "../layout/AuthLayout";
import { SignUp } from "../pages/signup/SignUp";
import CompanyOnboard from "../pages/CompanyOnboard/CompanyOnboard";
import CompanyRegLayout from "../layout/CompanyFormLayout";
import CompanyPolicy from "../pages/CompanyOnboard/CompanyPolicy";
import CompanyRepresentative from "../pages/CompanyOnboard/CompanyRep";
import LinkWithMono from "../pages/CompanyOnboard/LinkWithMono";
import { Employees } from "../pages/Employees/Employees";
import { AcceptedEmployees } from "../pages/Employees/AcceptedEmployees";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import CreateEmployee from "../pages/Employees/CreateEmployee";
import UploadEmployee from "../pages/Employees/UploadEmployee";
import ConfirmPayday from "../pages/Payment/ConfirmPayday";
import PaymentSummary from "../pages/Payment/PaymentSummary";
import LegalInfo from "../pages/Policy/LegalInfo";
import AdminList from "../pages/Administrator/AdminList";
import PaymentHistory from "../pages/Payment/PaymenHistory";
import AddStaff from "../pages/Administrator/AddStaff";
import AccountInfo from "../pages/Payment/AccountInfo";
import TotalTransactions from "../pages/Withdrawals/TotalTransactions";
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

const DashboardLayout = ({ child, navTab }) => {
  return <AppLayout navTab={navTab}>{child()}</AppLayout>;
};

const AuthPageLayout = ({ child }) => {
  return <AuthLayout>{child()}</AuthLayout>;
};

const CompanyOnboarding = ({ child }) => {
  return <CompanyRegLayout>{child()}</CompanyRegLayout>;
};

const employeeNavTab = [
  {
    name: "Employees",
    link: "/employee",
  },
  {
    name: "Accepted Employees",
    link: "/employee/accepted-employee",
  },
];

const paymentNavTab = [
  {
    name: "Payments",
    link: "/payments",
  },
  {
    name: "Payment History",
    link: "/payments/history",
  },
];

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
          path="/dashboard"
          render={() => <DashboardLayout child={DashboardHome} />}
          exact
        />
        <Route
          path="/login"
          render={() => <AuthPageLayout child={Login} />}
          exact
        />
        <Route
          path="/user/register"
          render={() => <AuthPageLayout child={UserSignUp} />}
          exact
        />

        <Route
          path="/user/login"
          render={() => <AuthPageLayout child={UserLogin} />}
          exact
        />

        <Route
          path="/user/reset-password"
          render={() => <AuthPageLayout child={OTPReset} />}
          exact
        />

        <Route
          path="/"
          render={() => <AuthPageLayout child={ChooseUser} />}
          exact
        />

        <Route
          path="/choose-user"
          render={() => <AuthPageLayout child={ChooseUser} />}
          exact
        />

        <Route
          path="/register"
          render={() => <AuthPageLayout child={SignUp} />}
        />
        <Route
          path="/onboard/step1"
          render={() => <CompanyOnboarding child={CompanyOnboard} />}
          exact
        />
        <Route
          path="/onboard/step2"
          render={() => <CompanyOnboarding child={CompanyRepresentative} />}
          exact
        />
        <Route
          path="/onboard/step3"
          render={() => <CompanyOnboarding child={CompanyPolicy} />}
          exact
        />
        <Route
          path="/onboard/step4"
          render={() => <CompanyOnboarding child={LinkWithMono} />}
          exact
        />
        <Route
          path="/employee"
          render={() => (
            <DashboardLayout navTab={employeeNavTab} child={Employees} />
          )}
          exact
        />
        <Route
          path="/employee/accepted-employee"
          render={() => (
            <DashboardLayout
              navTab={employeeNavTab}
              child={AcceptedEmployees}
            />
          )}
          exact
        />
        <Route
          path={`/employee/:id`}
          render={() => (
            <DashboardLayout navTab={employeeNavTab} child={EmployeeDetails} />
          )}
          exact
        />
        <Route
          path="/employee/create"
          render={() => (
            <DashboardLayout navTab={employeeNavTab} child={CreateEmployee} />
          )}
          exact
        />
        <Route
          path="/employee/upload"
          render={() => (
            <DashboardLayout navTab={employeeNavTab} child={UploadEmployee} />
          )}
        />
        <Route
          path="/employee/confirm-pay"
          render={() => (
            <DashboardLayout navTab={employeeNavTab} child={ConfirmPayday} />
          )}
        />
        <Route
          path="/payments"
          render={() => (
            <DashboardLayout navTab={paymentNavTab} child={PaymentSummary} />
          )}
          exact
        />
        <Route
          path="/legal-info"
          render={() => <DashboardLayout child={LegalInfo} />}
        />
        <Route
          path="/admins"
          render={() => <DashboardLayout child={AdminList} />}
        />
        <Route
          path="/payments/history"
          render={() => (
            <DashboardLayout navTab={paymentNavTab} child={PaymentHistory} />
          )}
          exact
        />
        <Route
          path="/user/dashboard"
          render={() => <DashboardLayout child={UserDashboard} />}
        />
        <Route
          path="/user/withdrawals"
          render={() => <DashboardLayout child={Withdrawals} />}
        />
        <Route
          path="/user/attendance"
          render={() => <DashboardLayout child={TimeAttendance} />}
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

        <Route
          path="/admin/add"
          render={() => <DashboardLayout child={AddStaff} />}
        />
        <Route
          path="/account-info"
          render={() => <DashboardLayout child={AccountInfo} />}
        />
        <Route
          path="/withdrawals"
          render={() => <DashboardLayout child={TotalTransactions} />}
        />
      </Switch>

      {/* </Router> */}
    </>
  );
};

export default Directory;
