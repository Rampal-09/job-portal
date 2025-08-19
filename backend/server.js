require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);

// local module

const { authRouter } = require("./routes/authRouter");
const { jobRouter } = require("./routes/jobRouter");

const app = express();
app.use(express.json());
app.use(cors());

const store = new mongodbStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
  })
);

app.use("/auth", authRouter);
app.use(jobRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on  http://localhost port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
