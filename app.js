// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

// Handles the handlebars
// https://www.npmjs.com/package/hbs
var hbs = require("hbs");
const path = require("path");
hbs.registerPartials(path.join(__dirname, "views/partials"));

var blocks = {};
hbs.registerHelper("extend", function (name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper("block", function (name) {
  var val = (blocks[name] || []).join("\n");
  // clear the block
  blocks[name] = [];
  return val;
});

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

require("./config/session")(app);

// User in session for front
app.use(function (req, res, next) {
  res.locals.user = req.session.currentUser;
  next();
});

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const movieRoutes = require("./routes/movie.routes");
app.use("/movie", movieRoutes);

const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/dashboard", dashboardRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
