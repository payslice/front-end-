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
import { checkLogin, checkTokenValidity } from "../utils/ApiUtils";
import DashboardHome from "../pages/DashboardHome/DashboardHome";

export const EmployerRoutesList = [
  { path: "/dashboard", component: DashboardHome, exact: true },
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
  { path: "/employee/create", component: CreateEmployee, exact: true },
  { path: "/employee/upload", component: UploadEmployee, exact: true },
  { path: "/employee/confirm-pay", component: ConfirmPayday, exact: true },
  { path: "/employee/:id", component: EmployeeDetails, exact: true },
  { path: "/payments", component: PaymentSummary, exact: true },
  { path: "/settings", component: LegalInfo, exact: true },
  { path: "/settings/admins", component: AdminList, exact: true },
  { path: "/payments/history", component: PaymentHistory, exact: true },
  { path: "/settings/admin/add", component: AddStaff, exact: true },
  { path: "/payments/account-info/:id", component: AccountInfo, exact: true },
  { path: "/withdrawals", component: TotalTransactions, exact: true },
];

const EmployerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLogin() && checkTokenValidity() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
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
const settingsNavTab = [
  {
    name: "Legal & Policy",
    link: "/settings",
  },
  // {
  //   name: "Administrators",
  //   link: "/settings/admins",
  // },
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
    if (location.pathname.startsWith("/settings")) {
      return settingsNavTab;
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
          // <Route component={r.component} path={r.path} exact={r.exact} />
        ))}
      </Switch>
    </AppLayout>
  );
};

export default EmployerRoutes;
