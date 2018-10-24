import React, { Component } from "react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Edit from "material-ui-icons/Edit";
import Person from "material-ui-icons/Person";
import Divider from "material-ui/Divider";
import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";

import { create } from "./api-user-submit-happiness.js";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Input from 'material-ui/Input';
import InputAdornment from 'material-ui/Input/InputAdornment';
import MenuItem from 'material-ui/Menu/MenuItem';


const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    font: "inherit"
  },
  textLabel: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  textArea: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  }
});

const happinesssLevels = [
  {
    value: 'Not At All Happy',
    label: 'Not At All Happy',
  },
  {
    value: 'Not So Happy',
    label: 'Not So Happy',
  },
  {
    value: "Neutral",
    label: "Neutral",
  },
  {
    value: "Happy",
    label: "Happy",
  },
  {
    value: "Very Happy",
    label: "Very Happy",
  }
];

class SubmitHappiness extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,

      name: "",
      teamName: "",
      individualHappiness: "",
      teamHappiness: "",

      dialogOpen: false

    };
    this.match = match;
  }
  init = userId => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };
  componentWillReceiveProps = props => {
    this.init(props.match.params.userId);
  };
  componentDidMount = () => {
    this.init(this.match.params.userId);
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.setState({ name: this.state.user.name });
    this.setState({ teamName: this.state.user.teamName });
  };
  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      teamName: this.state.name || undefined,
      individualHappiness: this.state.teamHappiness || undefined,
      teamHappiness: this.state.individualHappiness || undefined
    };
    create(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ error: "", dialogOpen: true });
      }
    });
  };
  resetState = () => {
    this.setState({ individualHappiness: "" });
    this.setState({ teamHappiness: "" });
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }
  render() {
    const { classes } = this.props;


    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            type="headline"
            component="h2"
            className={classes.title}
          >
            Submit Happiness
          </Typography>
          <TextField
            select
            id="individualHappiness"
            type="individualHappiness"
            label="Individual Happiness"
            className={classes.textField}
            value={this.state.individualHappiness}
            onChange={this.handleChange("individualHappiness")}
            margin="normal"
            InputProps={{startAdornment: <InputAdornment position="start">Select</InputAdornment>}}
            >
            {
              happinesssLevels.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
              ))
            }
            </TextField>
          <br />
          <TextField
            select
            id="teamHappiness"
            type="teamHappiness"
            label="Team Happiness"
            className={classes.textField}
            value={this.state.teamHappiness}
            onChange={this.handleChange("teamHappiness")}
            margin="normal"
            InputProps={{startAdornment: <InputAdornment position="start">Select</InputAdornment>}}
            >
            {
              happinesssLevels.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
              ))
            }
            </TextField>
          <br />
          {" "}
          {this.state.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {this.state.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="raised"
            onClick={this.clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.dialogOpen} disableBackdropClick={true}>
        <DialogTitle>New Event Log</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New submission successfully submitted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" autoFocus="autoFocus" variant="raised" onClick={this.resetState}>
              Close
            </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}
SubmitHappiness.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubmitHappiness);
