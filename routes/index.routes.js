const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/index.controller.js");

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

router.get("/", (req, res, next) => IndexController.getHomePage(req, res, next));

router.get("/dashboard", isLoggedIn, (req, res, next) => {
  res.render("dashboard", { user: req.session.currentUser });
});

module.exports = router;
