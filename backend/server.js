const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const Mongo_URI =
  "mongodb+srv://rampaltanwar0929:Rst%2309%3F29@clustertest.3gcxkjq.mongodb.net/jobPortalDB";

mongoose
  .connect(Mongo_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on  http://localhost port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
