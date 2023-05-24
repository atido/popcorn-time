const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboard.controller.js");

const { isLoggedIn } = require("../middleware/route-guard.js");

router.get("/", isLoggedIn, (req, res, next) =>
  DashboardController.getDashboardPage(req, res, next)
);

module.exports = router;
