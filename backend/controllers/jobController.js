const { application } = require("express");
const Job = require("../models/job");
const User = require("../models/user");

exports.postJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      experienceLevel,
      jobType,
      skills,
    } = req.body;

    const newjob = new Job({
      title,
      description,
      company,
      location,
      salary,
      experienceLevel,
      jobType,
      postedBy: req.session.user.id,
      skills,
    });

    await newjob.save();

    res.status(201).json({ message: "job created successfuly" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const {
      search,
      location,
      minSalary,
      maxSalary,
      experienceLevel,
      jobType,
      skills,
    } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search
        { company: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = parseInt(minSalary);
      if (maxSalary) query.salary.$lte = parseInt(maxSalary);
      if (experienceLevel) {
        filter.experienceLevel = experienceLevel;
      }

      if (jobType) {
        filter.jobType = jobType;
      }
      if (skills) {
        const skillsArray = Array.isArray(skills) ? skills : [skills];
        filter.skills = {
          $in: skillsArray.map((skill) => new RegExp(skill, "i")),
        };
      }
    }
    const allJobs = await Job.find(query).populate(
      "postedBy",
      "name email role"
    );

    res.status(200).json({ message: "feched all jobs", jobs: allJobs });
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
    job.experienceLevel = experienceLevel;
    job.jobType = jobType;
    job.skills = skills;
    await job.save();
    console.log("data is save in database");
    res.status(201).json({ job });
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

    res.status(200).json({ job });
  } catch (err) {
    res.status(500).json({ message: "Error deleting job", error: err.message });
  }
};

exports.postApplyJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const userId = req.session.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.applicants.includes(userId)) {
      job.applicants.push(userId);

      await job.save();

      return res.status(200).json({ message: "Applied successfully", job });
    } else {
      return res
        .status(400)
        .json({ message: "You already applied for this job" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

exports.postAddFavorite = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const userId = req.session.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (userId && !user.favorite.includes(jobId)) {
      user.favorite.push(jobId);
      await user.save();

      return res
        .status(200)
        .json({ message: "Job added to favorites", favorites: user.favorite });
    } else {
      return res
        .status(400)
        .json({ message: "You already add  this in favorite" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

exports.getAppliedJob = async (req, res, next) => {
  const userId = req.session.user.id;
  try {
    const appliedJobs = await Job.find({ applicants: userId }).populate(
      "applicants"
    );

    res.status(200).json({ appliedJobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

exports.getFavoriteJobs = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const favoriteJobs = await User.findById(userId).populate("favorite");

    res.status(200).json({ favoriteJobs });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

exports.removeFavroteJobs = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const jobId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorite: jobId } },
      { new: true }
    ).populate("favorite");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated favorites:", updatedUser.favorite);

    return res.json({
      message: "Job removed from favorites",
      favorite: updatedUser.favorite,
    });
  } catch (err) {
    console.error("Error removing favorite job:", err);
    res.status(500).json({ message: "Server error" });
  }
};
