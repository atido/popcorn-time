const MovieService = require("../services/movie.service");
const movieService = new MovieService();

async function getDashboardPage(req, res, next) {
  try {
    const featuredMovies = {};
    featuredMovies.popularMovies = await movieService.getPopularMovies();
    featuredMovies.trendingMovies = await movieService.getTrendingMovies();

    return res.render("dashboard", {
      featuredMovies,
      user: req.session.currentUser,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDashboardPage };
