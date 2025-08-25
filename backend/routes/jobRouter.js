const express = require("express");
jobRouter = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

jobRouter.post(
  "/jobs",
  authMiddleware,
  roleMiddleware(["employer"]),
  jobController.postJob
);
jobRouter.get(
  "/jobs",
  authMiddleware,
  roleMiddleware(["employer"]),
  jobController.getJob
);
jobRouter.put(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware(["employer"]),
  jobController.updateJob
);
jobRouter.delete(
  "/jobs/:id",
  authMiddleware,
  roleMiddleware(["employer"]),
  jobController.deleteJob
);

exports.jobRouter = jobRouter;
