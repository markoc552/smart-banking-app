import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";
import {connect, useSelector} from "react-redux"
import Login from "../pages/Login";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import NewTransaction from "./transactions/NewTransaction";
import Waults from "../pages//Waults";
import NewWault from "./waults/NewWault";
import References from "../pages/References";
import UserProfile from "../pages/UserProfile";
import UpdateProfile from "./profile/UpdateProfile";
import WithdrawMoney from "./transactions/WithdrawMoney";
import UploadMoney from "./transactions/UploadMoney";
import LoggedOut from "./auth/LoggedOut"

const PrivateRoute = ({ component, path, registeredOnly }) => {

  const isLoggedIn = useSelector(state => state.accounts.login)

  if(isLoggedIn && registeredOnly) {
    return <Route path={path} component={component} exact/>
  }

  return <Route path={path} component={LoggedOut} exact/>
};

const App = (props) => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/loggedOut" component={LoggedOut} exact/>
          <PrivateRoute registeredOnly path="/home/:id" component={Home} />
          <PrivateRoute
            registeredOnly
            path="/home/transactions/:id"
            component={Transactions}
          />
          <PrivateRoute
            registeredOnly
            path="/home/transactions/:id/new"
            component={NewTransaction}
          />
          <PrivateRoute registeredOnly path="/home/waults/:id" component={Waults} />
          <PrivateRoute registeredOnly path="/home/waults/:id/new" component={NewWault} />
          <PrivateRoute registeredOnly path="/home/references/:id" component={References} />
          <PrivateRoute registeredOnly path="/home/:id/profile" component={UserProfile} />
          <PrivateRoute
            registeredOnly
            path="/home/:id/profile/update"
            component={UpdateProfile}
          />
          <PrivateRoute registeredOnly path="/home/upload/:id" component={UploadMoney} />
          <PrivateRoute registeredOnly path="/home/withdraw/:id" component={WithdrawMoney} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
