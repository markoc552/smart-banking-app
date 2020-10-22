import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import history from "../history";
import { connect, useSelector } from "react-redux";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import Waults from "../pages//Waults";
import References from "../pages/References";
import UserProfile from "../pages/UserProfile";
import LoggedOut from "./auth/LoggedOut";
import Storage from "../pages/Storage"

const PrivateRoute = ({
  component: Component,
  path,
  registeredOnly,
  ...rest
}) => {
  const isLoggedIn = useSelector((state) => state.accounts.login);

  return <Route {...rest} render={(props) => <Component {...props} />} />;

  // return isLoggedIn && registeredOnly ? (
  //   <Route {...rest} render={(props) => <Component {...props} />} />
  // ) : (
  //   <Redirect to="/loggedOut" />
  // );
};

const App = (props) => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/loggedOut" component={LoggedOut} exact />
          <PrivateRoute
            registeredOnly
            path="/home/home/:id"
            component={Home}
            exact
          />
          <PrivateRoute
            registeredOnly
            path="/home/transactions/:id"
            component={Transactions}
            exact
          />

          <PrivateRoute
            registeredOnly
            path="/home/waults/:id"
            component={Waults}
            exact
          />

          <PrivateRoute
            registeredOnly
            path="/home/storage/:id"
            component={Storage}
            exact
          />
          <PrivateRoute
            registeredOnly
            path="/home/references/:id"
            component={References}
            exact
          />
          <PrivateRoute
            registeredOnly
            path="/home/:id/profile"
            component={UserProfile}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
