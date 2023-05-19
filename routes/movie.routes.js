const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");

router.get("/search", (req, res, next) => MovieController.searchMovie(req, res, next));

router.get("/:id/detail", (req, res, next) => MovieController.getMovieDetail(req, res, next));

module.exports = router;
