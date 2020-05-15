import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";

import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Home from "./home/Home";
import Transactions from "./transactions/Transactions";
import NewTransaction from "./transactions/NewTransaction";

const App = props => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home/dashboard/:id" exact component={Dashboard} />
          <Route path="/home/:id" exact component={Home} />
          <Route path="/home/transactions/:id" exact component={Transactions} />
          <Route
            path="/home/transactions/:id/new"
            exact
            component={NewTransaction}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
