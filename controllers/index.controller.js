const MovieService = require("../services/movie.service");
const movieService = new MovieService();

async function getHomePage(req, res, next) {
  try {
    const popularMovies = await movieService.getPopularMovies();
    const trendingMovies = await movieService.getTrendingMovies();

    return res.render("index", { popularMovies, trendingMovies, headerPosition: "fixed" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHomePage };
