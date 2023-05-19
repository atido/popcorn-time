const MovieMapper = require("../mapper/movieMapper");
const { MovieDb } = require("moviedb-promise");

class MovieService {
  constructor() {
    this.moviedb = new MovieDb(process.env.TMDB_API_KEY, process.env.TMDB_API_URL);
  }

  async getPopularMovies() {
    try {
      const popularMoviesFromApi = await this.moviedb.moviePopular();
      return popularMoviesFromApi.results
        .filter((movieFromApi) => movieFromApi.backdrop_path)
        .map((movieFromApi) => MovieMapper.toMovieDTO(movieFromApi));
    } catch (err) {
      throw new Error("Error when fetching popular movies", err);
    }
  }

  async getTrendingMovies() {
    try {
      const trendingMoviesFromApi = await this.moviedb.trending({
        media_type: "movie",
        time_window: "week",
      });
      return trendingMoviesFromApi.results
        .filter((movieFromApi) => movieFromApi.backdrop_path)
        .map((movieFromApi) => MovieMapper.toMovieDTO(movieFromApi));
    } catch (err) {
      throw new Error("Error when fetching trending movies", err);
    }
  }
  async searchMovie(query) {
    try {
      const moviesResults = await this.moviedb.searchMovie({ query });
      return moviesResults.results
        .filter((movieFromApi) => movieFromApi.backdrop_path)
        .map((movieFromApi) => MovieMapper.toMovieDTO(movieFromApi));
    } catch (err) {
      throw new Error("Error when searching movie", err);
    }
  }
  async getMovieDetail(id) {
    try {
      const movieResult = await this.moviedb.movieInfo({ id });
      console.log(movieResult);
      return MovieMapper.toMovieDetailDTO(movieResult);
    } catch (err) {
      throw new Error("Error when searching movie", err);
    }
  }
}
module.exports = MovieService;
