const MovieService = require("../services/movie.service");
const movieService = new MovieService();
const UserService = require("../services/user.service");
const userService = new UserService();

async function searchMovie(req, res, next) {
  try {
    const movies = await movieService.searchMovie(req.query.query);
    return res.render("movie/movieList", {
      search: { query: req.query.query, resultsLength: movies.length },
      movies,
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
    if (req.session.currentUser) {
      user = await userService.getUserByUsername(req.session.currentUser.username);
      movieService.checkedActionIndicatorsMovies(user, [movie]);
    }
    return res.render("movie/movieDetail", { movie, headerPosition: "fixed" });
  } catch (err) {
    next(err);
  }
}

async function addToWatchHistory(req, res, next) {
  try {
    const movieId = req.params.id;
    const { isBtn } = req.body;

    const isMovieWatched = await userService.toggleUserWatchHistory(
      req.session.currentUser.username,
      movieId
    );

    res.status(200);
    res.render(isBtn ? "partials/buttons/buttonwatch" : "partials/buttons/iconwatch", {
      layout: false,
      id: movieId,
      watched: isMovieWatched,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

async function addToWatchList(req, res, next) {
  try {
    const movieId = req.params.id;
    const { isBtn } = req.body;
    const isMovieInWatchList = await userService.toggleUserWatchList(
      req.session.currentUser.username,
      movieId
    );
    res.render(isBtn ? "partials/buttons/buttonwatchlist" : "partials/buttons/iconwatchlist", {
      layout: false,
      id: movieId,
      watchList: isMovieInWatchList,
    });
    res.status(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

async function rateMovie(req, res, next) {
  try {
    const movieId = req.params.id;
    const { rate, isBtn } = req.body;
    const userRateForMovie = await userService.updateUserRateMovie(
      req.session.currentUser.username,
      movieId,
      rate
    );

    res.render(isBtn ? "partials/buttons/buttonrate" : "partials/buttons/iconrate", {
      layout: false,
      id: movieId,
      userRate: userRateForMovie,
    });
    res.status(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

module.exports = {
  getMovieDetail,
  searchMovie,
  addToWatchHistory,
  addToWatchList,
  rateMovie,
};
