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
      return MovieMapper.toMovieDetailDTO(movieResult);
    } catch (err) {
      throw new Error("Error when getting movie", err);
    }
  }
  async getMovieWatchProviders(id) {
    try {
      const movieWatchProvidersResult = await this.moviedb.movieWatchProviders({ id });
      const movieWatchProviders = {};
      movieWatchProviders.flatrate = movieWatchProvidersResult.results.FR?.flatrate?.map(
        (provider) => MovieMapper.toMovieWatchProvidersDTO(provider)
      );
      movieWatchProviders.buy = movieWatchProvidersResult.results.FR?.buy?.map((provider) =>
        MovieMapper.toMovieWatchProvidersDTO(provider)
      );
      movieWatchProviders.rent = movieWatchProvidersResult.results.FR?.rent?.map((provider) =>
        MovieMapper.toMovieWatchProvidersDTO(provider)
      );
      movieWatchProviders.resultsNumber =
        movieWatchProviders.flatrate?.length +
        movieWatchProviders.buy?.length +
        movieWatchProviders.rent?.length;
      return movieWatchProviders;
    } catch (err) {
      throw new Error("Error when getting watch providers", err);
    }
  }
  async getMovieActors(id) {
    try {
      const actorsResult = await this.moviedb.movieCredits({ id });
      return actorsResult.cast.map((actor) => MovieMapper.toMovieActorsDTO(actor));
    } catch (err) {
      throw new Error("Error when getting actors", err);
    }
  }
}
module.exports = MovieService;
