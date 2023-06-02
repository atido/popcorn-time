const MovieService = require("../services/movie.service");
const UserService = require("../services/user.service");
const userService = new UserService();
const movieService = new MovieService();

async function getDashboardPage(req, res, next) {
  try {
    const featuredMovies = {};
    const user = await userService.findOne({ username: req.session.currentUser.username });
    featuredMovies.popularMovies = await movieService.getPopularMovies();
    movieService.checkedActionIndicatorsMovies(user, featuredMovies.popularMovies);

    featuredMovies.trendingMovies = await movieService.getTrendingMovies();
    movieService.checkedActionIndicatorsMovies(user, featuredMovies.trendingMovies);

    const watchListMovies = await movieService.getMovies(user.watchList);
    movieService.checkedActionIndicatorsMovies(user, watchListMovies);

    const userMoviesRecommandations = await userService.getUserMoviesRecommandations(user.username);

    return res.render("dashboard", {
      featuredMovies,
      watchListMovies,
      userMoviesRecommandations,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function refreshUserMoviesRecommandations(req, res, next) {
  try {
    const userMoviesRecommandations = await userService.getUserMoviesRecommandations(
      req.session.currentUser.username
    );

    res.render("partials/recommandations/recommandationsmovies", {
      layout: false,
      userMoviesRecommandations,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getDashboardPage, refreshUserMoviesRecommandations };
