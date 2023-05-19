const MovieService = require("../services/movie.service");
const movieService = new MovieService();

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
    return res.render("movie/movieDetail", { movie });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMovieDetail, searchMovie };
