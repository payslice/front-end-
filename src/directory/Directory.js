import React from "react";
import AppLayout from "../layout/AppLayout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { Login } from "../pages/login/Login";
import AuthLayout from "../layout/AuthLayout";
import { SignUp } from "../pages/signup/SignUp";
import CompanyOnboard from "../pages/CompanyOnboard/CompanyOnboard";
import CompanyRegLayout from "../layout/CompanyFormLayout";
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

const DashboardLayout = ({ child }) => {
  return <AppLayout>{child()}</AppLayout>;
};

const AuthPageLayout = ({ child }) => {
  return <AuthLayout>{child()}</AuthLayout>;
};

const CompanyOnboarding = ({ child }) => {
  return <CompanyRegLayout>{child()}</CompanyRegLayout>;
};

const Directory = () => {
  return (
    <>
      {/* <Router> */}
      <Switch>
        <Route
          path="/"
          render={() => <DashboardLayout child={Dashboard} />}
          exact
        />
        <Route path="/login" render={() => <AuthPageLayout child={Login} />} />
        <Route
          path="/register"
          render={() => <AuthPageLayout child={SignUp} />}
        />
        <Route
          path="/onboard"
          render={() => <CompanyOnboarding child={CompanyOnboard} />}
        />
        <Route
          path="/employees"
          render={() => <DashboardLayout child={Employees} />}
        />
        <Route
          path="/accepted-employees"
          render={() => <DashboardLayout child={AcceptedEmployees} />}
        />
        <Route
          path="/employee/1"
          render={() => <DashboardLayout child={EmployeeDetails} />}
        />
        <Route
          path="/employee/create"
          render={() => <DashboardLayout child={CreateEmployee} />}
        />
        <Route
          path="/employee/upload"
          render={() => <DashboardLayout child={UploadEmployee} />}
        />
        <Route
          path="/employee/confirm-pay"
          render={() => <DashboardLayout child={ConfirmPayday} />}
        />
        <Route
          path="/payment/summary"
          render={() => <DashboardLayout child={PaymentSummary} />}
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
          path="/payment/history"
          render={() => <DashboardLayout child={PaymentHistory} />}
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
          path="/transactions"
          render={() => <DashboardLayout child={TotalTransactions} />}
        />
      </Switch>

      {/* </Router> */}
    </>
  );
};

export default Directory;
