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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "Server is running!" });
});

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
app.use((req, res, next) => {
  if (
    req.path.startsWith("/api/") ||
    req.path.startsWith("/auth/") ||
    req.path.startsWith("/jobs/")
  ) {
    res.status(404).json({ message: "API endpoint not found" });
  } else {
    next();
  }
});

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
