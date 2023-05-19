const MovieService = require("../services/movie.service");
const movieService = new MovieService();

async function getMovieDetail(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function searchMovie(req, res, next) {
  try {
    const movies = await movieService.searchMovie(req.query.query);
    return res.render("movie/movieList", { movies });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMovieDetail, searchMovie };
