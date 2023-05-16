const { MovieDb } = require("moviedb-promise");
const MovieDTO = require("../dto/movieDTO");
const moviedb = new MovieDb(process.env.TMDB_API_KEY, process.env.TMDB_API_URL);

async function getMovies(req, res, next) {
  try {
    const popularMoviesFromApi = await moviedb.moviePopular();

    const trendingMoviesFromApi = await moviedb.trending({
      media_type: "movie",
      time_window: "week",
    });
    return res.render("index", {
      popularMovies: popularMoviesFromApi.results.map((movieFromApi) => new MovieDTO(movieFromApi)),
      trendingMovies: trendingMoviesFromApi.results.map(
        (movieFromApi) => new MovieDTO(movieFromApi)
      ),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMovies };
