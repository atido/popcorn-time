const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movie.controller.js");
const { isLoggedIn } = require("../middleware/route-guard.js");

router.get("/search", (req, res, next) => MovieController.searchMovie(req, res, next));

router.get("/:id/detail", (req, res, next) => MovieController.getMovieDetail(req, res, next));

router.post("/:id/watch", isLoggedIn, (req, res, next) =>
  MovieController.addToWatchHistory(req, res, next)
);

router.post("/:id/remove", isLoggedIn, (req, res, next) =>
  MovieController.removeFromWatchHistory(req, res, next)
);

router.post("/:id/addWatchList", isLoggedIn, (req, res, next) =>
  MovieController.addToWatchList(req, res, next)
);

router.post("/:id/removeWatchList", isLoggedIn, (req, res, next) =>
  MovieController.removeFromWatchList(req, res, next)
);

module.exports = router;
