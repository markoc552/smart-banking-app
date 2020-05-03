import React from 'react'
import {Router, Switch, Route} from "react-router-dom";
import history from "../history";

import Login from "./auth/Login";

const App = (props) => {
  return (<div className="ui container">
    <Router history={history}>
      <Route path="/" exact="exact" component={Login}/>
    </Router>
  </div>)
}

export default App;
