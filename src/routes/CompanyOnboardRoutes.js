import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CompanyOnboard from '../pages/CompanyOnboard/CompanyOnboard';
import CompanyRegLayout from '../layout/CompanyFormLayout';
import CompanyPolicy from '../pages/CompanyOnboard/CompanyPolicy';
import CompanyRepresentative from '../pages/CompanyOnboard/CompanyRep';
import LinkWithMono from '../pages/CompanyOnboard/LinkWithMono';
import { checkLogin, checkTokenValidity } from '../utils/ApiUtils';

export const CompanyOnboardRoutesList = [
	{ path: '/onboard/step1', component: CompanyOnboard, exact: true },
	{ path: '/onboard/step2', component: CompanyRepresentative, exact: true },
	{ path: '/onboard/step3', component: CompanyPolicy, exact: true },
	{ path: '/onboard/step4', component: LinkWithMono, exact: true },
];

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (checkLogin() && checkTokenValidity() ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	);
};

const CompanyOnboardRoutes = () => {
	return (
		<CompanyRegLayout>
			<Switch>
				{CompanyOnboardRoutesList.map((r) => (
					<PrivateRoute path={r.path} exact={true} component={r.component} key={r.path} />
				))}
			</Switch>
		</CompanyRegLayout>
	);
};

export default CompanyOnboardRoutes;
