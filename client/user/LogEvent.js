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

import { create } from "./api-user-event-log.js";
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

const meetingTypes = [
  {
    value: 'Sprint Review',
    label: 'Sprint Review',
  },
  {
    value: 'Retrospective',
    label: 'Retrospective',
  },
  {
    value: "Sprint Planning",
    label: "Sprint Planning",
  }
];

class LogEvent extends Component {
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false,

      name: "",
      meetingType: "",
      description: "",

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
  };
  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      meetingType: this.state.meetingType || undefined,
      description: this.state.description || undefined
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
    this.setState({ meetingType: "" });
    this.setState({ description: "" });
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
            Log Event
          </Typography>
          <TextField
            select
            id="meetingType"
            type="meetingType"
            label="Meeting Type"
            className={classes.textField}
            value={this.state.meetingType}
            onChange={this.handleChange("meetingType")}
            margin="normal"
            InputProps={{startAdornment: <InputAdornment position="start">Select</InputAdornment>}}
            >
            {
              meetingTypes.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
              ))
            }
            </TextField>
          <br />

          <div>
          <label className={classes.textField, classes.textLabel}>
          Description
          </label>
          <textarea
            id="description"
            label="Description"
            className={classes.textField}
            value={this.state.description}
            onChange={this.handleChange("description")}
            margin="normal"
          />
          </div>
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
            New event successfully logged.
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
LogEvent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LogEvent);
