import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
// import { checkLogin, checkTokenValidity } from "../utils/ApiUtils";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import TransferMoney from "../pages/Business/Employee/TransferMoney";
import MoneyRequest from "../pages/Business/Employee/MoneyRequest";
import AssociateMoney from "../pages/Business/Employee/AssociateMoney";
import FundWallet from "../pages/Business/Employee/FundWallet";


export const BusinessRoutesList = [
  { path: "/business/dashboard", component: DashboardHome, exact: true },
  { path: "/business/transfer", component: TransferMoney, exact: true },
  { path: "/business/money", component: MoneyRequest, exact: true },
  { path: "/business/associate", component: AssociateMoney, exact: true },
  { path: "/business/wallet", component: FundWallet, exact: true },

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

const uploadEmployeeNavTab = [
  {
    name: "Employee",
    link: "/business/upload",
  }
];

const moneyNavTab = [
 { name: "Credit Limit Money",
  link: "business/money",
},

 { name: "Associate Money  ",
  link: "business/associate",
}
]; 

const walletNavTab = [
  { name: "Wallet",
   link: "business/wallet",
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
