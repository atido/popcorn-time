class MovieMapper {
  static toMovieDTO(movieFromApi) {
    return {
      id: movieFromApi.id,
      title: movieFromApi.title,
      backdrop_img: `${process.env.TMDB_API_IMG_URL}w1280${movieFromApi.backdrop_path}`,
      release_date: movieFromApi.release_date,
      vote: movieFromApi.vote_average,
    };
  }
  static toMovieDetailDTO(movieDetailFromApi) {
    return {
      id: movieDetailFromApi.id,
      title: movieDetailFromApi.title,
      overview: movieDetailFromApi.overview,
      backdrop_img: `${process.env.TMDB_API_IMG_URL}w1280${movieDetailFromApi.backdrop_path}`,
      poster_img: `${process.env.TMDB_API_IMG_URL}w780${movieDetailFromApi.poster_path}`,
      release_date: movieDetailFromApi.release_date,
      vote: movieDetailFromApi.vote_average,
      runtime: movieDetailFromApi.runtime,
    };
  }
}

module.exports = MovieMapper;
