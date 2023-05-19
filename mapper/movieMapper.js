class MovieMapper {
  static toMovieDTO(movieFromApi) {
    return {
      id: movieFromApi.id,
      title: movieFromApi.title,
      img: `${process.env.TMDB_API_IMG_URL}w1280${movieFromApi.backdrop_path}`,
      release_date: movieFromApi.release_date,
      vote: movieFromApi.vote_average,
    };
  }
  static toMovieDetailDTO(movieDetailFromApi) {
    return movieDetailFromApi;
  }
}

module.exports = MovieMapper;
