import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";
import HappinessSubmissionCtrl from "../controllers/HappinessSubmission.controller";
import eventLogCtrl from "../controllers/eventLog.controller";

const router = express.Router();

router
  .route("/api/users")
  .get(userCtrl.list)
  .post(userCtrl.create);

router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router
    .route("/api/happinessSubmissions")
    .get(HappinessSubmissionCtrl.list)
    .post(HappinessSubmissionCtrl.create);

router
  .route("/api/eventlogs")
  .get(eventLogCtrl.list)
  .post(eventLogCtrl.create);

router.param("userId", userCtrl.userByID);

export default router;
