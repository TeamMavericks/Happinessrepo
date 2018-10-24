import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import CreateUser from "./user/CreateUser";
import Signin from "./auth/Signin";
import SubmitHappiness from "./user/SubmitHappiness";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import LogEvent from "./user/LogEvent";
import Events from "./user/Events";
import Menu from "./core/Menu";
import Footer from "./core/Footer";

class MainRouter extends Component {
  // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/submitHappiness/:userId" component={SubmitHappiness} />
          <Route path="/users" component={Users} />
          <Route path="/createUser" component={CreateUser} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
          <Route path="/logEvent/:userId" component={LogEvent} />
          <Route path="/events" component={Events} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default MainRouter;
