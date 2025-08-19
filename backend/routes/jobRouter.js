const express = require("express");
jobRouter = express.Router();
const jobController = require("../controllers/jobController");

jobRouter.post("/jobs", jobController.postJob);
jobRouter.get("/jobs", jobController.getJob);
jobRouter.put("/job/:id", jobController.updateJob);

exports.jobRouter = jobRouter;
