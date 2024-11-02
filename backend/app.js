/* eslint-disable no-undef */
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routers/routers");

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowedOrigins = ["http://localhost:3000"];

      const originIsAllowed = allowedOrigins.indexOf(origin) !== -1;
      callback(null, originIsAllowed);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// Handle Preflight Requests
app.options("*", cors());

// Body Parser and Cookie Parser Implementation
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(cors());

// Database Connection
let URI = process.env.DATABASE_URL;
let options = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASS,
};
async function connectDB() {
  try {
    await mongoose.connect(URI, options);
    console.log("Database Connection Success");
  } catch (e) {
    console.error("Database Connection Error:", e);
  }
}
connectDB();

// Routing Implementation
app.use("/api", mainRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
module.exports = app;
