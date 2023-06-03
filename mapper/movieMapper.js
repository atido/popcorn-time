const { toHoursAndMinutes } = require("../utils/time");
class MovieMapper {
  static toMovieDTO(movieFromApi) {
    const { id, title, backdrop_path, poster_path, release_date, vote_average } = movieFromApi;
    return {
      id,
      title,
      backdrop_img: `${process.env.TMDB_API_IMG_URL}w780${backdrop_path}`,
      poster_img: `${process.env.TMDB_API_IMG_URL}w154${poster_path}`,
      release_date,
      vote_average: Math.round(vote_average * 10) / 10,
    };
  }
  static toMovieDetailDTO(movieDetailFromApi) {
    const {
      id,
      title,
      overview,
      backdrop_path,
      poster_path,
      release_date,
      vote_average,
      vote_count,
      genres,
      runtime,
    } = movieDetailFromApi;
    return {
      id,
      title,
      overview,
      backdrop_img: `${process.env.TMDB_API_IMG_URL}w1280${backdrop_path}`,
      poster_img: `${process.env.TMDB_API_IMG_URL}w154${poster_path}`,
      release_date: new Date(release_date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      vote_average: Math.round(vote_average * 10) / 10,
      genres: genres.map((genre) => genre.name),
      runtime: toHoursAndMinutes(runtime),
      vote_count,
    };
  }
  static toMovieWatchProvidersDTO(movieProviderFromApi) {
    const { logo_path, provider_name } = movieProviderFromApi;
    return {
      logo_img: `${process.env.TMDB_API_IMG_URL}w92${logo_path}`,
      provider_name,
    };
  }
  static toMovieActorsDTO(movieActorsFromApi) {
    const { name, character, profile_path } = movieActorsFromApi;
    const profile_img = profile_path
      ? `${process.env.TMDB_API_IMG_URL}w154${profile_path}`
      : "/images/default-actor.png";
    return {
      name,
      character,
      profile_img,
    };
  }
}

module.exports = MovieMapper;
