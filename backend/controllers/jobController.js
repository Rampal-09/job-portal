const Job = require("../models/job");

exports.postJob = async (req, res, next) => {
  try {
    console.log("data come from router", req.body);
    console.log(req.session.user);

    const { title, description, company, location, salary } = req.body;

    const newjob = new Job({
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.session.user.id,
    });

    await newjob.save();
    console.log("data is save on database");
    res.status(201).json({ message: "job created successfuly" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const allJobs = await Job.find().populate("postedBy", "name email");
    console.log(allJobs);
    res.status(200).json({ message: "feched all jobs" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    job.title = req.body.title;
    job.description = req.body.description;
    job.company = req.body.company;
    job.location = req.body.location;
    job.salary = req.body.salary;

    await job.save();
    res.status(201).json({ message: "job update successfuly" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err.message });
  }
};
