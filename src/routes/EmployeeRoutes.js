import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import { checkLogin, checkTokenValidity } from '../utils/ApiUtils';
import UserDashboard from '../pages/EmployeePages/Dashboard';
import Withdrawals from '../pages/EmployeePages/Withdrawals/Withdrawals';
import WithdrawFunds from '../pages/EmployeePages/Withdrawals/WithdrawFunds';
import TimeAttendance from '../pages/EmployeePages/Attendance/TimeAttendance';
import PersonalInfo from '../pages/EmployeePages/PersonalInfo/PersonalInfo';
import BankingInfo from '../pages/EmployeePages/PersonalInfo/BankingInfo';

export const EmployeeRoutesList = [
	{ path: '/user/dashboard', component: UserDashboard, exact: true },
	{
		path: '/user/withdrawals',
		component: Withdrawals,
		exact: true,
	},
	{
		path: '/user/withdrawals/withdraw',
		component: WithdrawFunds,
		exact: true,
	},
	{ path: '/user/attendance', component: TimeAttendance, exact: true },
	{ path: '/user/settings', component: PersonalInfo, exact: true },
	{ path: '/user/settings/banking', component: BankingInfo, exact: true },
];

const userInfoNavTab = [
	{
		name: 'Personal Infomation',
		link: '/user/settings',
	},
	{
		name: 'Banking Information',
		link: '/user/settings/banking',
	},
];

const PrivateEmployeeRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				checkLogin() && checkTokenValidity() ? <Component {...props} /> : <Redirect to="/user/login" />
			}
		/>
	);
};

const EmployeeRoutes = () => {
	const location = useLocation();

	const useNavTab = () => {
		if (location.pathname.startsWith('/user/settings') || location.pathname.startsWith('/user/settings/banking')) {
			return userInfoNavTab;
		}
	};

	return (
		<AppLayout navTab={useNavTab()}>
			<Switch>
				{EmployeeRoutesList.map((r) => (
					<PrivateEmployeeRoute path={r.path} exact={true} component={r.component} key={r.path} navTab={r.navTab} />
					// <Route component={r.component} path={r.path} exact={r.exact} />
				))}
			</Switch>
		</AppLayout>
	);
};

export default EmployeeRoutes;
