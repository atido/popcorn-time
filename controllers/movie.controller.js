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
      user = await userService.findOne({ username: req.session.currentUser.username });
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
    console.log(
      "movieId:",
      movieId,
      "-isBtn:",
      isBtn,
      "-username:",
      req.session.currentUser.username
    );
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
    const watched =
      (await userService.count({
        $and: [{ username: req.session.currentUser.username }, { watched: { $in: [movieId] } }],
      })) > 0;
    res.status(200);
    res.render(isBtn ? "partials/buttons/buttonwatch" : "partials/buttons/iconwatch", {
      layout: false,
      id: movieId,
      watched,
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
    const watchList =
      (await userService.count({
        $and: [{ username: req.session.currentUser.username }, { watchList: { $in: [movieId] } }],
      })) > 0;
    res.render(isBtn ? "partials/buttons/buttonwatchlist" : "partials/buttons/iconwatchlist", {
      layout: false,
      id: movieId,
      watchList,
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
    await userService.findOneAndUpdate(
      { username: req.session.currentUser.username },
      {
        $pull: {
          rates: { movieId: movieId },
        },
      }
    );
    await userService.findOneAndUpdate(
      { username: req.session.currentUser.username },
      {
        $push: {
          rates: { movieId: movieId, rate },
        },
      }
    );
    const results = await userService.findOne(
      {
        $and: [
          { username: req.session.currentUser.username },
          { rates: { $elemMatch: { movieId: movieId } } },
        ],
      },
      { "rates.$": 1 }
    );
    res.render(isBtn ? "partials/buttons/buttonrate" : "partials/buttons/iconrate", {
      layout: false,
      id: movieId,
      userRate: results?.rates[0]?.rate,
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
