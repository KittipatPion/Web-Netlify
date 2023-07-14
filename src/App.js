import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Variable from "../src/helpers/VariableController";
import "./scss/style.scss";
import "./App.css";
import { getDate } from "date-fns";
import SystemInfo from "./helpers/SystemInfo";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Test = React.lazy(() => import("./components/master/contract/Transfer"));
const CookieNotice = React.lazy(() => import("./views/pages/cookieNotice/cookieNotice"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const exp = localStorage.getItem("exp");
const expiryDate = localStorage.getItem("expiry");
const ApproveContract = React.lazy(() =>
  import("./components/master/contract/ApproveContract")
);
var path = "/";

const isAuthenticated = () => {
  var status = false;

  if (expiryDate * 1000 > Date.now()) {
    if (token) {
      status = true;
    } else {
      status = false;
    }
  } else {
    // alert(expiryDate * 1000)
    status = false;
  }
  return status;
};

// if(username !== "admin"){

//   path = '/master/Contract/ApproveContract'

// }

const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated() ? <Component {...props} /> : <Redirect to={path} />
    }
  />
);

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const getTitleName = () => {
  var developList = ["DEV-LOCAL", "DEV-NB01", "DEV-NB02"];
  var deployPOList = ["DP-LOCAL", "UAT-PO"];
  var deploySCGList = ["UAT-SCG-DEV", "UAT-SCG-QA"];
  var productionList = ["PD"];
  var txtWebName = "Smart Payment";
  if (developList.find((x) => x === SystemInfo.environmentType)) {
    return "[DEV] " + txtWebName;
  } else if (deployPOList.find((x) => x === SystemInfo.environmentType)) {
    return "[UAT] " + txtWebName;
  } else if (deploySCGList.find((x) => x === SystemInfo.environmentType)) {
    return "[SCG] " + txtWebName;
  } else if (productionList.find((x) => x === SystemInfo.environmentType)) {
    return "[PRO] " + txtWebName;
  } else {
    return "[UNKNOWN] " + txtWebName;
  }
};

class App extends Component {
  render() {
    document.getElementById("title-bar").innerHTML = getTitleName();
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <UnauthenticatedRoute
              exact
              path="/login"
              name="Login Page"
              component={Login}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              component={Register}
            />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <AuthenticatedRoute path={path} name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export { App as default, isAuthenticated };
