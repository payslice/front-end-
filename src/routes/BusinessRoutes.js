import React, { createContext, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { checkLogin, checkTokenValidity } from "../utils/ApiUtils";
// import DashboardHome from "../pages/DashboardHome/DashboardHome";z
import DashboardHome from "../pages/Business/DashboardHome";
import BusinessDashboard from "../pages/Business/BusinessDashboard";
import TransferMoney from "../pages/Business/Employee/TransferMoney";
import MoneyRequest from "../pages/Business/Employee/MoneyRequest";
import AssociateMoney from "../pages/Business/Employee/AssociateMoney";
import FundWallet from "../pages/Business/Employee/FundWallet";
import FloatMoney from "../pages/Business/Employee/FloatMoney";
import EmployeeReport from "../pages/Business/Employee/EmployeeReport";
import LinkBank from "../pages/Business/Employee/LinkBank";
import DashboardWallet from "../pages/Business/DashboardWallet";
import DashboardPayroll from "../pages/Business/payroll/Payroll";
import DashboardPayroll2 from "../pages/Business/payroll/DashboardPayroll";
import DashboardPayrollReport from "../pages/Business/DashboardPayrollReport";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import UploadEmployee from "../pages/Business/Employee/UploadEmployee";
import CreateEmployee from "../pages/Business/Employee/CreateEmployee";
import Wallet from "../pages/Business/Wallet";
import WalletAirtime from "../pages/Business/wallets/WalletAirtime";
import WalletData from "../pages/Business/wallets/WalletData";
import WalletElectricity from "../pages/Business/wallets/WalletElectricity";
import CreateEmployeePayroll from "../pages/Business/payroll/CreateEmployeePayroll";
import RequestMoenyHistory from "../pages/Business/Employee/RequestMoneyHistory";
import UpdateEmployeePayroll from "../pages/Business/payroll/UpdateEmployeePayroll";
import RequestMoneyDashboard from "../pages/Business/Employee/RequestMoneyDashboard";
import SchedulePayout from "../pages/Business/payroll/SchedulePayout";
import CreatePayoutSchedule from "../pages/Business/payroll/CreatePayoutSchedule";

export const UpdateEmployeeContext = createContext('')


export const BusinessRoutesList = [
  // { path: "/business/dashboard", component: DashboardHome, exact: true },
  { path: "/business/dashboard", component: BusinessDashboard, exact: true },
  { path: "/business/wallets", component: Wallet, exact: true },
  { path: "/business/wallets/airtime", component: WalletAirtime, exact: true },
  { path: "/business/wallets/data", component: WalletData, exact: true },
  { path: "/business/wallets/electricity", component: WalletElectricity, exact: true },
  { path: "/business/wallets/transfer", component: TransferMoney, exact: true },
  { path: "/business/payroll", component: DashboardPayroll, exact: true },  
  { path: "/business/payroll/upload", component: UploadEmployee, exact: true },  
  { path: "/business/payroll/createemployee", component: CreateEmployeePayroll, exact: true },  
  { path: "/business/payroll/updateemployee", component: UpdateEmployeePayroll, exact: true },  
  { path: "/business/payroll/schedule", component: SchedulePayout, exact: true },  
  { path: "/business/payroll/schedule/create", component: CreatePayoutSchedule, exact: true },  
  { path: "/business/request_money", component: RequestMoneyDashboard, exact: true },
  { path: "/business/request_money/history", component: RequestMoenyHistory, exact: true },
  { path: "/business/request_money/dashboard", component: RequestMoenyHistory, exact: true },
  { path: "/business/request_money/credit_limit", component: MoneyRequest, exact: true },
  { path: "/business/request_money/associate", component: AssociateMoney, exact: true },
  { path: "/business/settings", component: AssociateMoney, exact: true },
  { path: "/business/create", component: CreateEmployee, exact: true }, 
  { path: "/business/details", component: EmployeeDetails, exact: true }, 
  { path: "/business/wallet", component: FundWallet, exact: true },
  { path: "/business/float", component: FloatMoney, exact: true },
  { path: "/business/report", component: EmployeeReport, exact: true },
  { path: "/business/link", component: LinkBank, exact: true },
  { path: "/business/dashboard/wallet", component: DashboardWallet, exact: true },
  { path: "/business/dashboard/payroll/report", component: DashboardPayrollReport, exact: true }, 
];

const BusinessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLogin() && checkTokenValidity() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/business/login" />
        )
        // <Component {...props} />
      }
    />
  );
};

const employeeNavTab = [
  {
    name: "Employee",
    link: "/business/transfer",
  }
];
const createemployeeNavTab = [
  {
    name: "Employee",
    link: "/business/dashboard",
  },
  {
    name: "Accepted Employees",
    link: "/business/dashboard",
  }
];
const uploadNavBar = [
  {
    name: "Employee",
    link: "/business/dashboard",
  }
];
const RequestMoney = [
  
  {
    name: "Credit Limit Money Request",
    link: "/business/request_money/credit_limit",
  },
  {
    name: "Associate Money Request",
    link: "/business/request_money/associate",
  }
];
const floatNavTab = [
  {
    name: "Employee",
    link: "/business/float",
  }
];

const reportNavTab = [
  {
    name: "Employee",
    link: "/business/report",
  }
];

const moneyNavTab = [
 { name: "Credit Limit Money",
  link: "/business/money",
},

 { name: "Associate Money  ",
  link: "/business/associate",
}
]; 

const walletNavTab = [
  { name: "Wallet",
   link: "business/wallet",
 },
 ]; 

const linkNavTab = [
  { name: "Employee",
   link: "business/link",
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

const BusinessRoutes = () => {
  const location = useLocation();
  const [employeeUpateData, setEmployeeUpdateData] = useState()

  const useNavTab = () => {
    if (location.pathname.startsWith("/business/transfer")) {
      return employeeNavTab;
    }
    // if (location.pathname.startsWith("/business/payroll")) {
    //   return employeeNavTab;
    // }
    if (location.pathname.startsWith("/business/request_money")) {
      return RequestMoney;
    }
    if (location.pathname.startsWith("/business/upload")) {
      return uploadNavBar;
    }
    if (location.pathname.startsWith("/business/create")) {
      return createemployeeNavTab;
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
    if (location.pathname.startsWith("/business/money")) {
      return moneyNavTab;
    }
    if (location.pathname.startsWith("/business/associate")) {
      return moneyNavTab;
    }
    if (location.pathname.startsWith("/business/wallet")) {
      return walletNavTab;
    }
    if (location.pathname.startsWith("/business/float")) {
      return floatNavTab;
    }
    if (location.pathname.startsWith("/business/report")) {
      return reportNavTab;
    }
    if (location.pathname.startsWith("/business/link")) {
      return linkNavTab;
    }
   
  };

  return (
    <UpdateEmployeeContext.Provider value={{employeeUpateData, setEmployeeUpdateData}}>
    <AppLayout navTab={useNavTab()}>
      <Switch>
        {BusinessRoutesList.map((r) => (
          <BusinessRoute
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
    </UpdateEmployeeContext.Provider>
  );
};

export default BusinessRoutes;
