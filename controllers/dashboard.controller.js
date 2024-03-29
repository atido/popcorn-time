const MovieService = require("../services/movie.service");
const UserService = require("../services/user.service");
const userService = new UserService();
const movieService = new MovieService();

async function getDashboardPage(req, res, next) {
  try {
    const featuredMovies = {};
    console.log("getDashboard for Session ID :', sessionId, :", req.sessionID);
    const user = await userService.getUserByUsername(req.session.currentUser.username);
    featuredMovies.popularMovies = await movieService.getPopularMovies();
    movieService.checkedActionIndicatorsMovies(user, featuredMovies.popularMovies);

    featuredMovies.trendingMovies = await movieService.getTrendingMovies();
    movieService.checkedActionIndicatorsMovies(user, featuredMovies.trendingMovies);

    const watchListMovies = await movieService.getMovies(user.watchList);
    movieService.checkedActionIndicatorsMovies(user, watchListMovies);

    const recommandations = await userService.getUserMoviesRecommandations(user.username);

    return res.render("dashboard", {
      featuredMovies,
      watchListMovies,
      recommandations,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function refreshUserMoviesRecommandations(req, res, next) {
  try {
    const recommandations = await userService.getUserMoviesRecommandations(
      req.session.currentUser.username
    );
    res.render("partials/recommandations/recommandationsmovies", {
      layout: false,
      recommandations,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getDashboardPage, refreshUserMoviesRecommandations };
