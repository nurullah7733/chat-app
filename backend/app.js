const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
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
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://laramintkw.com",
        "https://lara-mint-ecommerce-app.vercel.app",
      ];
      const regex = /\.laramintkw\.com$/;

      if (allowedOrigins.indexOf(origin) !== -1 || regex.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
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

// Undefined Route Handling
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

module.exports = app;
