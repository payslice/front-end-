import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
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
import { checkLogin } from "../utils/ApiUtils";

export const EmployerRoutesList = [
  {
    path: "/employee",
    component: Employees,
    exact: true,
  },
  {
    path: "/employee/accepted-employee",
    component: AcceptedEmployees,
    exact: true,
  },
  { path: "/employee/:id", component: EmployeeDetails, exact: true },
  { path: "/employee/create", component: CreateEmployee, exact: true },
  { path: "/employee/upload", component: UploadEmployee, exact: true },
  { path: "/employee/confirm-pay", component: ConfirmPayday, exact: true },
  { path: "/payments", component: PaymentSummary, exact: true },
  { path: "/legal-info", component: LegalInfo, exact: true },
  { path: "/admins", component: AdminList, exact: true },
  { path: "/payments/history", component: PaymentHistory, exact: true },
  { path: "/admin/add", component: AddStaff, exact: true },
  { path: "/account-info", component: AccountInfo, exact: true },
  { path: "/withdrawals", component: TotalTransactions, exact: true },
];

const EmployerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
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

const EmployerRoutes = () => {
  const location = useLocation();

  const useNavTab = () => {
    if (location.pathname.startsWith("/employee")) {
      return employeeNavTab;
    }
    if (location.pathname.startsWith("/payments")) {
      return paymentNavTab;
    }
    if (location.pathname.startsWith("/user/settings")) {
      return userInfoNavTab;
    }
  };

  return (
    <AppLayout navTab={useNavTab()}>
      <Switch>
        {EmployerRoutesList.map((r) => (
          <EmployerRoute
            path={r.path}
            exact={true}
            component={r.component}
            key={r.path}
            navTab={r.navTab}
          />
        ))}
      </Switch>
    </AppLayout>
  );
};

export default EmployerRoutes;
