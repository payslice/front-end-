import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
// import { checkLogin, checkTokenValidity } from "../utils/ApiUtils";
// import DashboardHome from "../pages/DashboardHome/DashboardHome";
import DashboardHome from "../pages/Business/DashboardHome";
import TransferMoney from "../pages/Business/Employee/TransferMoney";
import MoneyRequest from "../pages/Business/Employee/MoneyRequest";
import AssociateMoney from "../pages/Business/Employee/AssociateMoney";
import FundWallet from "../pages/Business/Employee/FundWallet";
import FloatMoney from "../pages/Business/Employee/FloatMoney";
import EmployeeReport from "../pages/Business/Employee/EmployeeReport";
import LinkBank from "../pages/Business/Employee/LinkBank";
import DashboardWallet from "../pages/Business/DashboardWallet";
import DashboardPayroll from "../pages/Business/DashboardPayroll";
import DashboardPayrollReport from "../pages/Business/DashboardPayrollReport";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import UploadEmployee from "../pages/Business/Employee/UploadEmployee";
import CreateEmployee from "../pages/Business/Employee/CreateEmployee";
import Wallet from "../pages/Business/Wallet";
import EarnasPayroll from '../pages/Business/payroll/EarnasPayroll';


export const BusinessRoutesList = [
  { path: "/business/dashboard", component: DashboardHome, exact: true },
  { path: "/business/dashboard/wallets", component: Wallet, exact: true },
  { path: "/business/dashboard/wallet", component: DashboardWallet, exact: true },
  { path: "/business/dashboard/payroll/report", component: DashboardPayrollReport, exact: true }, 
  { path: "/business/payroll", component: DashboardPayroll, exact: true },  
  { path: "/business/payroll/earn", component: EarnasPayroll, exact: true },  
  { path: "/business/payroll/history", component: EarnasPayroll, exact: true },  
  { path: "/business/create", component: CreateEmployee, exact: true }, 
  { path: "/business/details", component: EmployeeDetails, exact: true }, 
  { path: "/business/upload", component: UploadEmployee, exact: true }, 
  { path: "/business/transfer", component: TransferMoney, exact: true },
  { path: "/business/money", component: MoneyRequest, exact: true },
  { path: "/business/associate", component: AssociateMoney, exact: true },
  { path: "/business/wallet", component: FundWallet, exact: true },
  { path: "/business/float", component: FloatMoney, exact: true },
  { path: "/business/report", component: EmployeeReport, exact: true },
  { path: "/business/link", component: LinkBank, exact: true },
];

const BusinessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        // checkLogin() && checkTokenValidity() ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect to="/login" />
        // )
        <Component {...props} />
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
const dashboardWalletNavTab = [
  {
    name: "Credit Limit Money ",
    link: "/business/dashboard",
  },
  {
    name: "Associate Money  ",
    link: "/business/dashboard",
  }
];
const Payroll = [
  {
    name: "Employee Payroll ",
    link: "/business/payroll",
  },
  {
    name: "Earn as you go",
    link: "/business/payroll/earn",
  },
  {
    name: "Payroll Histroy",
    link: "/business/payroll/history",
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

  const useNavTab = () => {
    if (location.pathname.startsWith("/business/transfer")) {
      return employeeNavTab;
    }
    // if (location.pathname.startsWith("/business/payroll")) {
    //   return employeeNavTab;
    // }
    if (location.pathname.startsWith("/business/dashboard/wallet")) {
      return dashboardWalletNavTab;
    }
    if (location.pathname.startsWith("/business/upload")) {
      return uploadNavBar;
    }
    if (location.pathname.startsWith("/business/create")) {
      return createemployeeNavTab;
    }
    if (location.pathname.startsWith("/business/payroll")) {
      return Payroll;
    }
    if (location.pathname.startsWith("/business/payroll/report")) {
      return Payroll;
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
  );
};

export default BusinessRoutes;
