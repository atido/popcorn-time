const MovieMapper = require("../../mapper/movieMapper");
require("dotenv").config({ path: ".env.test" });

describe("MovieMapper", () => {
  describe("toMovieDTO", () => {
    it("should convert movie data from API to a DTO object", () => {
      const movieFromApi = {
        id: 1,
        title: "Movie Title",
        backdrop_path: "/backdrop.jpg",
        poster_path: "/poster.jpg",
        release_date: "2023-01-01",
        vote_average: 7.5,
      };

      const expectedDTO = {
        id: 1,
        title: "Movie Title",
        backdrop_img: `https://test.api.example.com/images/w780/backdrop.jpg`,
        poster_img: `https://test.api.example.com/images/w154/poster.jpg`,
        release_date: "2023-01-01",
        vote_average: 7.5,
      };

      const result = MovieMapper.toMovieDTO(movieFromApi);

      expect(result).toEqual(expectedDTO);
    });
  });

  describe("toMovieDetailDTO", () => {
    it("should convert movie detail data from API to a DTO object", () => {
      const movieDetailFromApi = {
        id: 1,
        title: "Movie Title",
        overview: "Movie overview",
        backdrop_path: "/backdrop.jpg",
        poster_path: "/poster.jpg",
        release_date: "2023-01-01",
        vote_average: 7.5,
        vote_count: 100,
        genres: [{ name: "Action" }, { name: "Drama" }],
        runtime: 120,
      };

      const expectedDTO = {
        id: 1,
        title: "Movie Title",
        overview: "Movie overview",
        backdrop_img: "https://test.api.example.com/images/w1280/backdrop.jpg",
        poster_img: "https://test.api.example.com/images/w154/poster.jpg",
        release_date: "January 1, 2023",
        vote_average: 7.5,
        genres: ["Action", "Drama"],
        runtime: "2h00",
        vote_count: 100,
      };

      const result = MovieMapper.toMovieDetailDTO(movieDetailFromApi);

      expect(result).toEqual(expectedDTO);
    });
  });

  describe("toMovieWatchProvidersDTO", () => {
    it("should convert movie provider data from API to a DTO object", () => {
      const movieProviderFromApi = {
        logo_path: "/logo.jpg",
        provider_name: "Provider Name",
      };

      const expectedDTO = {
        logo_img: "https://test.api.example.com/images/w92/logo.jpg",
        provider_name: "Provider Name",
      };

      const result = MovieMapper.toMovieWatchProvidersDTO(movieProviderFromApi);

      expect(result).toEqual(expectedDTO);
    });
  });

  describe("toMovieActorsDTO", () => {
    it("should convert movie actors data from API to a DTO object", () => {
      const movieActorsFromApi = {
        name: "Actor Name",
        character: "Character Name",
        profile_path: "/profile.jpg",
      };

      const expectedDTO = {
        name: "Actor Name",
        character: "Character Name",
        profile_img: "https://test.api.example.com/images/w154/profile.jpg",
      };

      const result = MovieMapper.toMovieActorsDTO(movieActorsFromApi);

      expect(result).toEqual(expectedDTO);
    });

    it("should handle missing profile path with a default actor image", () => {
      const movieActorsFromApi = {
        name: "Actor Name",
        character: "Character Name",
        profile_path: null,
      };

      const expectedDTO = {
        name: "Actor Name",
        character: "Character Name",
        profile_img: "/images/default-actor.png",
      };

      const result = MovieMapper.toMovieActorsDTO(movieActorsFromApi);

      expect(result).toEqual(expectedDTO);
    });
  });
});
