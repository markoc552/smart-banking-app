import React from 'react'
import { Router, Route } from "react-router-dom";
import history from "../history";

import Login from "./auth/Login";
import Home from "./Home";

const App = (props) => {
  return (<div className="ui container">
    <Router history={history}>
      <Route path="/" exact component={Login}/>
      <Route path="/home/:id" exact component={Home}/>
    </Router>
  </div>)
}

export default App;
