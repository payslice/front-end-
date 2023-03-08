import React, { createContext, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { checkLogin, checkTokenValidity } from "../utils/ApiUtils";
import UserDashboard from "../pages/EmployeePages/Dashboard";
import Withdrawals from "../pages/EmployeePages/Withdrawals/Withdrawals";
import WithdrawFunds from "../pages/EmployeePages/Withdrawals/WithdrawFunds";
import PersonalInfo from "../pages/EmployeePages/PersonalInfo/PersonalInfo";
import BankingInfo from "../pages/EmployeePages/PersonalInfo/BankingInfo";
import Kyc from "../pages/EmployeePages/PersonalInfo/Kyc";
import NextOfKin from "../pages/EmployeePages/PersonalInfo/NextOfKin";
import UpdateWorkplace from "../pages/EmployeePages/PersonalInfo/UpdateWorkplace";
import AddWorkPlace from "../pages/EmployeePages/Dashboard/AddWorkPlace/AddWorkplace";
import ConfirmEmployee from "../pages/EmployeePages/Dashboard/AddWorkPlace/ConfirmEmployee";
import { Wallets } from "../pages/EmployeePages/Withdrawals/Wallets";

export const EmployeeIdContext = createContext('')

export const EmployeeRoutesList = [
  { path: "/user/dashboard", component: UserDashboard, exact: true },
  { path: "/user/dashboard/workplace/add", component: AddWorkPlace, exact: true },
  { path: "/user/dashboard/workplace/confirm_employee", component:ConfirmEmployee , exact: true },
  { path: "/user/workplace/update", component: UpdateWorkplace, exact: true },
  {
    path: "/user/withdrawals",
    component: Withdrawals,
    exact: true,
  },

  {
    path: "/user/withdrawals/withdraw",
    component: WithdrawFunds,
    exact: true,
  },
  { path: "/user/wallets", component: Wallets, exact: true },
//   { path: "/user/attendance", component: TimeAttendance, exact: true },
  { path: "/user/settings", component: PersonalInfo, exact: true },
  { path: "/user/settings/banking", component: BankingInfo, exact: true },
  { path: "/user/settings/kyc", component: Kyc, exact: true },
  { path: "/user/settings/nextofkin", component: NextOfKin, exact: true },
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
  {
    name: "KYC",
    link: "/user/settings/kyc",
  },
  {
    name: "Next Of Kin",
    link: "/user/settings/nextofkin",
  },
];

const PrivateEmployeeRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        checkLogin() && checkTokenValidity() 
        ? 
        (
          <Component {...props} />
        ) 
        : 
        (
          <Redirect to="/user/login" />
        )
      }
    />
  );
};

const EmployeeRoutes = () => {

	const [employeeIdState, setEmployeeIdState] = useState('')

  const location = useLocation();

  const useNavTab = () => {
    if (
      location.pathname.startsWith("/user/settings") ||
      location.pathname.startsWith("/user/settings/banking")
    ) {
      return userInfoNavTab;
    }
  };

  return (
	<EmployeeIdContext.Provider value={{employeeIdState, setEmployeeIdState}}>
		<AppLayout navTab={useNavTab()}>
		<Switch>
			{EmployeeRoutesList.map((r) => (
			<PrivateEmployeeRoute
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
    </EmployeeIdContext.Provider>
  );
};

export default EmployeeRoutes;
