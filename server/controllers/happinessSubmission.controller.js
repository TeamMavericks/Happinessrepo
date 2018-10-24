import HappinessSubmission from "../models/happinessSubmission.model";
import _ from "lodash";
import errorHandler from "./../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const happinessSubmission = new HappinessSubmission(req.body);
  happinessSubmission.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json({
      message: "Successfully submitted happiness!"
    });
  });
};

const list = (req, res) => {
  happinessSubmission.find((err, happinessSubmissions) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(happinessSubmissions);
  })
};

export default {
  create,
  list
};
