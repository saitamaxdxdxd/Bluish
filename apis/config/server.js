const express = require("express");
const morgan = require("morgan");

const { port } = require("./env");

const minds = require("../routes/minds.route");
const themes = require("../routes/themes.route");
const articles = require("../routes/articles.route");
const alteregos = require("../routes/alteregos.route");

const app = express();

// Settings
app.set("port", port);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1.0.0/minds", minds);
app.use("/api/v1.0.0/themes", themes);
app.use("/api/v1.0.0/articles", articles);
app.use("/api/v1.0.0/alteregos", alteregos);

module.exports = app;