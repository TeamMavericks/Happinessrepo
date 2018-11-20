import React, { Component } from "react";
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
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ArrowForward from "material-ui-icons/ArrowForward";
import Person from "material-ui-icons/Person";
import { Link } from "react-router-dom";
import { list } from "./api-user-submit-happiness.js";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import Divider from "material-ui/Divider";

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    textAlign: "center",
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
});

class HappinessSubmissions extends Component {
  state = {
    happinessSubmissions: [],
    open: true
  };

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(JSON.stringify(data));
        this.setState({ happinessSubmissions: data });
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Happiness Submissions
        </Typography>
        <List dense>
          {this.state.happinessSubmissions.map((item, i) => {
            return (
              <div>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Divider />
                <ListItem>
                  <ListItemText primary={"Name: " + item.name} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary={"Timestamp: " + new Date(item.created).toString()} />
                </ListItem>
                <ListItem>
                  <ListItemText econdary={"Description: " + item.teamName} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary={"Meeting Type: " + item.individualHappiness} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary={"Team Name: " + item.teamHappiness} />
                </ListItem>
                </div>
            );
          })}
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider />
        </List>
      </Paper>
    );
  }
}

HappinessSubmissions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HappinessSubmissions);
