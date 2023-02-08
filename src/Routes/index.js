import { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import _ from "lodash";
import history from "./history";
import LandingPage from "../Pages/LandingPage";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import HomePage from "../Pages/HomePage";
import Error404 from "../utils/Error404";
import { getSessionToken } from "../utils/session";

class Routes extends Component {
  render() {
    if (window.location.pathname === "/") {
      if (_.isEmpty(getSessionToken("sessionId")) === false) {
        history.push("/HomePage");
      }
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/SignUpPage" component={SignUpPage} />
          <Route exact path="/HomePage" component={HomePage} />
          <Route component={Error404} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
