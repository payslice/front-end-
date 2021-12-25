import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import AuthRoutes, { AuthRoutesList } from "./AuthRoute";
import CompanyOnboardRoutes, {
  CompanyOnboardRoutesList,
} from "./CompanyOnboardRoutes";
import EmployeeRoutes, { EmployeeRoutesList } from "./EmployeeRoutes";
import EmployerRoutes, { EmployerRoutesList } from "./EmployerRoutes";

const RouteList = [
  {
    path: AuthRoutesList.map((r) => r.path),
    exact: true,
    component: AuthRoutes,
  },
  {
    path: CompanyOnboardRoutesList.map((r) => r.path),
    exact: true,
    component: CompanyOnboardRoutes,
  },
  {
    path: EmployerRoutesList.map((r) => r.path),
    exact: true,
    component: EmployerRoutes,
  },
  {
    path: EmployeeRoutesList.map((r) => r.path),
    exact: true,
    component: EmployeeRoutes,
  },
];

const Routes = () => {
  const history = useHistory();

  history.listen(() => {
    window.scroll(0, 0);
  });

  return (
    <Switch>
      {RouteList.map((r) => (
        <Route
          path={r.path}
          key={r.path}
          component={r.component}
          exact={r.exact}
        />
      ))}
    </Switch>
  );
};

export default Routes;
