const express = require("express");
jobRouter = express.Router();
const jobController = require("../controllers/jobController");

jobRouter.post("/jobs", jobController.postJob);
jobRouter.get("/jobs", jobController.getJob);
jobRouter.put("/jobs/:id", jobController.updateJob);
jobRouter.delete("/jobs/:id" , jobController.deleteJob)

exports.jobRouter = jobRouter;
