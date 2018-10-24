import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import HomeIcon from "material-ui-icons/Home";
import Button from "material-ui/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const styles = {
  menuAppBar : {
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
  },
  menuToolbar : {
    margin: "auto"
  },
  menuParent : {
    margin: "auto"
  },
  menuItem : {
    margin: "auto"
  },
  menuDiv : {
    margin: "auto"
  }
}

const isActive = (history, path) => {
  return {
    color: history.location.pathname == path ? "#dcedff" : "#ffffff",
    margin: "auto",
    textAlign: "center"
  };
};
const Menu = withRouter(({ history }) => (
  <AppBar position="static" style={styles.menuAppBar}>
    <Toolbar style={styles.menuToolbar}>

    <div style={styles.menuDiv}>
    <Link to="/" style={styles.menuParent}>
      <Button style={isActive(history, "/")}>Home</Button>
    </Link>
    </div>

  {
    !auth.isAuthenticated() && (
      <div style={styles.menuDiv}>
      <Link to="/signin" style={styles.menuParent}>
        <Button style={isActive(history, "/signin")}>Sign In</Button>
      </Link>
      </div>
  )}

  {
    auth.isAuthenticated() && (auth.isAuthenticated().user.role == "Default")  && (
      <div style={styles.menuDiv}>
      <Link to={"/submitHappiness/" + auth.isAuthenticated().user._id} style={styles.menuParent}>
        <Button style={isActive(history, "/submitHappiness/" + auth.isAuthenticated().user._id)}>Submit Happiness</Button>
      </Link>
      </div>
  )}

  {
    auth.isAuthenticated() && (auth.isAuthenticated().user.role == "Owner" || auth.isAuthenticated().user.role == "Admin")  && (
      <div style={styles.menuDiv}>
      <Link to="/createUser" style={styles.menuParent}>
        <Button style={isActive(history, "/createUser")}>Create User</Button>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      </div>
  )}

  {
    auth.isAuthenticated() && auth.isAuthenticated().user.role == "Logger"  && (
      <div style={styles.menuDiv}>
      <Link to={"/logEvent/" + auth.isAuthenticated().user._id} style={styles.menuParent}>
        <Button style={isActive(history, "/logEvent/" + auth.isAuthenticated().user._id)}>Log Event</Button>
      </Link>
      <Link to="/events" style={styles.menuParent}>
        <Button style={isActive(history, "/events")}>Events</Button>
      </Link>
      </div>
  )}

  {
    auth.isAuthenticated() && (
      <div style={styles.menuDiv}>
      <Link to={"/user/" + auth.isAuthenticated().user._id} style={styles.menuParent}>
        <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
      </Link>
      <Button color="inherit" onClick={() => {auth.signout(() => history.push('/'))}}>Sign out</Button>
    </div>
  )}

    </Toolbar>
  </AppBar>
));

export default Menu;
