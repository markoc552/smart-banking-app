import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";

import Login from "./auth/Login";
import Home from "./home/Home";
import Transactions from "./transactions/Transactions";
import NewTransaction from "./transactions/NewTransaction";
import Waults from "./waults/Waults";
import NewWault from "./waults/NewWault";

const App = props => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home/:id" exact component={Home} />
          <Route path="/home/transactions/:id" exact component={Transactions} />
          <Route
            path="/home/transactions/:id/new"
            exact
            component={NewTransaction}
          />
          <Route path="/home/waults/:id" exact component={Waults} />
          <Route path="/home/waults/:id/new" exact component={NewWault} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
