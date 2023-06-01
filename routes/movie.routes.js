const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");
const { isLoggedIn } = require("../middleware/route-guard.js");

router.get("/search", (req, res, next) => MovieController.searchMovie(req, res, next));

router.get("/:id/detail", (req, res, next) => MovieController.getMovieDetail(req, res, next));

router.post("/:id/watch", isLoggedIn, (req, res, next) =>
  MovieController.addToWatchHistory(req, res, next)
);

router.post("/:id/watchList", isLoggedIn, (req, res, next) =>
  MovieController.addToWatchList(req, res, next)
);

router.post("/:id/rate", isLoggedIn, (req, res, next) => MovieController.rateMovie(req, res, next));

module.exports = router;
