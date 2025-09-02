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

jobRouter.get("/jobs/apply", authMiddleware, jobController.getAppliedJob);

jobRouter.post("/jobs/apply/:id", authMiddleware, jobController.postApplyJob);
jobRouter.get("/jobs/favorite", authMiddleware, jobController.getFavoriteJobs);
jobRouter.post(
  "/jobs/favorite/:id",
  authMiddleware,
  jobController.postAddFavorite
);

exports.jobRouter = jobRouter;
