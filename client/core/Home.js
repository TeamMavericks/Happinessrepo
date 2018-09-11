import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import logo from "./../assets/images/logo.png";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  },
  title: {
    color: theme.palette.text.secondary,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    textAlign: "center"
  },
  content: {
    textAlign: "center"
  },
  logo: {
    minHeight: 500
  },
  buttons: {
  },
  signup: {
    margin: "auto",
    width: "50%"
  },
  signin: {
    margin: "auto",
    width: "50%"
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography type="headline" component="h2" className={classes.title}>
          Home Page
        </Typography>
        <CardMedia
          className={classes.logo}
          image={logo}
          title="Logo"
        />
        <CardContent>
          <Typography type="body1" component="p" className={classes.content}>
            Welcome to How.Is.It App Home Page.
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
