import EventLog from "../models/eventLog.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const eventLog = new EventLog(req.body);
  eventLog.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json({
      message: "Successfully logged event!"
    });
  });
};

const list = (req, res) => {
  EventLog.find((err, eventLogs) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(eventLogs);
  })
};

export default {
  create,
  list
};
