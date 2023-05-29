const MovieService = require("../services/movie.service");
const UserService = require("../services/user.service");
const userService = new UserService();
const movieService = new MovieService();

async function getDashboardPage(req, res, next) {
  try {
    const featuredMovies = {};
    featuredMovies.popularMovies = await movieService.getPopularMovies();
    featuredMovies.trendingMovies = await movieService.getTrendingMovies();
    const user = await userService.findOne({ username: req.session.currentUser.username });

    featuredMovies.popularMovies.forEach((movie) => {
      if (user.watched.includes(movie.id)) {
        movie.watched = true;
      }
      if (user.watchList.includes(movie.id)) {
        movie.watchList = true;
      }
    });
    featuredMovies.trendingMovies.forEach((movie) => {
      if (user.watched.includes(movie.id)) {
        movie.watched = true;
      }
      if (user.watchList.includes(movie.id)) {
        movie.watchList = true;
      }
    });

    return res.render("dashboard", {
      featuredMovies,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardPage };
