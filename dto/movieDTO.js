class MovieDTO {
  constructor(movieFromApi) {
    this.title = movieFromApi.title;
    this.img = `${process.env.TMDB_API_IMG_URL}w300${movieFromApi.backdrop_path}`;
    this.release_date = movieFromApi.release_date;
    this.vote = movieFromApi.vote_average;
  }
}

module.exports = MovieDTO;
