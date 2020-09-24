// require npm packages & models
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", { useNewUrlParser: true });

// Start server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });  