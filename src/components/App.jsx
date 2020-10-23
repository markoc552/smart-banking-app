import React, { useState } from "react";
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
import Storage from "../pages/Storage";
import en from "../i18n/en.json";
import cro from "../i18n/cro.json";
import { IntlProvider } from "react-intl";

const App = (props) => {

  const preferedLanguage = navigator.language.split(/[-_]/)[0];

  const messages = {
    "en": en,
    "cro": cro,
  };

  const [lang, setLang] = useState(preferedLanguage);

  // const PrivateRoute = ({
  //   component: Component,
  //   path,
  //   registeredOnly,
  //   ...rest
  // }) => {
  //   const isLoggedIn = useSelector((state) => state.accounts.login);
  //
  //   return (
  //     <Route
  //       {...rest}
  //       render={(props) => <Component {...props} onLangChange={setLang} />}
  //     />
  //   );
  //
  //   // return isLoggedIn && registeredOnly ? (
  //   //   <Route {...rest} render={(props) => <Component {...props} />} />
  //   // ) : (
  //   //   <Redirect to="/loggedOut" />
  //   // );
  // };


  const PrivateRoute = ({
    component: Component,
    path,
    registeredOnly,
    ...rest
  }) => {
    const isLoggedIn = useSelector((state) => state.accounts.login);

    return isLoggedIn && registeredOnly ? (
      <Route {...rest} render={(props) => <Component {...props} onLangChange={setLang} />} />
    ) : (
      <Redirect to="/loggedOut" />
    );
  };

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
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
    </IntlProvider>
  );
};

export default App;
