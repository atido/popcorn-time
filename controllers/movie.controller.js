const MovieService = require("../services/movie.service");
const movieService = new MovieService();
const UserService = require("../services/user.service");
const userService = new UserService();

async function searchMovie(req, res, next) {
  try {
    const moviesResults = await movieService.searchMovie(req.query.query);
    return res.render("movie/movieList", {
      search: { query: req.query.query, resultsLength: moviesResults.length },
      movies: moviesResults,
    });
  } catch (err) {
    next(err);
  }
}

async function getMovieDetail(req, res, next) {
  try {
    const movie = await movieService.getMovieDetail(req.params.id);
    movie.actors = await movieService.getMovieActors(req.params.id);
    movie.watchProviders = await movieService.getMovieWatchProviders(req.params.id);
    return res.render("movie/movieDetail", { movie, headerPosition: "fixed" });
  } catch (err) {
    next(err);
  }
}

async function addToWatchHistory(req, res, next) {
  try {
    const movieId = req.params.id;
    await userService.findOneAndUpdate({ username: req.session.currentUser.username }, [
      {
        $set: {
          watched: {
            $cond: [
              { $in: [movieId, "$watched"] },
              { $setDifference: ["$watched", [movieId]] },
              { $concatArrays: ["$watched", [movieId]] },
            ],
          },
        },
      },
    ]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

async function addToWatchList(req, res, next) {
  try {
    const movieId = req.params.id;
    await userService.findOneAndUpdate({ username: req.session.currentUser.username }, [
      {
        $set: {
          watchList: {
            $cond: [
              { $in: [movieId, "$watchList"] },
              { $setDifference: ["$watchList", [movieId]] },
              { $concatArrays: ["$watchList", [movieId]] },
            ],
          },
        },
      },
    ]);
    res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}
module.exports = {
  getMovieDetail,
  searchMovie,
  addToWatchHistory,
  addToWatchList,
};
