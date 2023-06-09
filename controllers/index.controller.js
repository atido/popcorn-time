const MovieService = require("../services/movie.service");
const movieService = new MovieService();

async function getHomePage(req, res, next) {
  try {
    const featuredMovies = {};
    featuredMovies.popularMovies = await movieService.getPopularMovies();
    featuredMovies.trendingMovies = await movieService.getTrendingMovies();

    return res.render("index", { featuredMovies, headerPosition: "fixed" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHomePage };
