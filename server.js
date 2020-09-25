// require npm packages & models
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

// api routes

app.get("/api/workouts", (req, res) => {
  // sorts docs by day then finds only the first one (i.e. gets the most recent entry)
  db.Workout.find({}).sort({ day: -1 }).limit(1)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req,res) => {
  // gets last 7 workouts (assumed 1-week range based on buildout of charts)
  db.Workout.find({}).sort({ day: -1 }).limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
