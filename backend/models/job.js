const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
  experienceLevel: {
    type: String,
    required: true,
    enum: {
      values: ["entry", "mid", "senior", "lead"],
    },
  },
  jobType: {
    type: String,
    required: [true, "Job type is required"],
    enum: {
      values: [
        "full-time",
        "part-time",
        "contract",
        "freelance",
        "internship",
        "remote",
      ],
    },
  },
  skills: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Job", jobSchema);
