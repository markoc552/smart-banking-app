import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "../history";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import NewTransaction from "./transactions/NewTransaction";
import Waults from "../pages//Waults";
import NewWault from "./waults/NewWault";
import References from "../pages/References";

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
          <Route path="/home/references/:id" exact component={References} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
