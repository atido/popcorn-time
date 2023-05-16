class ApiService {
  constructor() {}

  async getPopularMovies() {
    try {
      console.log(
        process.env.TMDB_API_URL + "movie/popular" + "?api_key=" + process.env.TMDB_API_KEY
      );
      const response = await fetch(
        process.env.TMDB_API_URL + "movie/popular" + "?api_key=" + process.env.TMDB_API_KEY
      );
      return await response.json();
    } catch (err) {
      throw new Error("Error when fetching popular movie", err);
    }
  }
}

module.exports = ApiService;
