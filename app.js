// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
var exphbs = require("express-handlebars");
const path = require("path");
//hbs.registerPartials(path.join(__dirname, "views/partials"));

const app = express();

var hbs = exphbs.create({
  defaultLayout: "layout",
  extname: ".hbs",
  helpers: {
    section: function (name, options) {
      if (!this.sections) this.sections = {};
      this.sections[name] = options.fn(this);
      return null;
    },
  },
});
app.engine("hbs", hbs.engine);
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

require("./config/session")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
