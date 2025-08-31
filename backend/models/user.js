const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["candidate", "employer"], default: "candidate" },
  favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});

module.exports = mongoose.model("User", userschema);
