const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userREoutes");
const cors = require("cors");
const bodyParser = require('body-parser')
const candidateRoutes = require("./routes/candidateRoutes");

const jobPostingRoutes = require("./routes/jobPostingRoutes");
const contactFormRoutes = require("./routes/contactFormRoutes");
const companyRoutes = require("./routes/companyRoutes");
const adminRoutes = require('./routes/Routes');
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("uploads"));

mongoose
  .connect(
    "mongodb+srv://adarsh00761:SMh3aM8Smo6gdqjX@cluster0.srwvuso.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Use the correct route for userRoutes
app.use("/users", userRoutes);
// Include candidate routes
app.use("/candidates", candidateRoutes);
//Include Job Postings Routes
app.use("/jobpostings", jobPostingRoutes);
//include Contact Form Route
app.use("/contactforms", contactFormRoutes);
// include Company Routes
app.use("/company", companyRoutes);
// include Candidate form
//admin
app.use('/admin', adminRoutes);

// Define middleware, routes, and other configurations
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Listen on port 9000 (or the value of process.env.PORT if defined)
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
