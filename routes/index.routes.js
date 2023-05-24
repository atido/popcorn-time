const express = require("express");
const router = express.Router();
const IndexController = require("../controllers/index.controller.js");

router.get("/", (req, res, next) => IndexController.getHomePage(req, res, next));

module.exports = router;
