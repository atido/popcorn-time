const MongooseService = require("./mongoose.service");
const MovieService = require("./movie.service");
const UserModel = require("../models/User.model");

class UserService {
  constructor() {
    this.mongooseService = new MongooseService(UserModel);
    this.movieService = new MovieService();
  }

  async createUser(email, password, username) {
    try {
      return await this.mongooseService.create({ email, password, username });
    } catch (err) {
      throw new Error("Error when creating user", err);
    }
  }

  async getUserByUsername(username) {
    try {
      return await this.mongooseService.findOne({ username });
    } catch (err) {
      throw new Error("Error when finding user", err);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.mongooseService.findOne({ email });
    } catch (err) {
      throw new Error("Error when finding user", err);
    }
  }

  async getUserById(id) {
    try {
      return await this.mongooseService.findOne({ _id: id });
    } catch (err) {
      throw new Error("Error when finding user", err);
    }
  }

  async toggleUserWatchHistory(username, movieId) {
    try {
      const result = await this.mongooseService.findOneAndUpdate({ username }, [
        {
          $set: {
            watched: {
              $cond: [
                { $in: [movieId, "$watched"] },
                { $setDifference: ["$watched", [movieId]] },
                { $concatArrays: ["$watched", [movieId]] },
              ],
            },
          },
        },
      ]);
      return result?.watched?.includes(movieId);
    } catch (err) {
      throw new Error("Error when updating watch history", err);
    }
  }

  async toggleUserWatchList(username, movieId) {
    try {
      const result = await this.mongooseService.findOneAndUpdate({ username }, [
        {
          $set: {
            watchList: {
              $cond: [
                { $in: [movieId, "$watchList"] },
                { $setDifference: ["$watchList", [movieId]] },
                { $concatArrays: ["$watchList", [movieId]] },
              ],
            },
          },
        },
      ]);
      return result?.watchList?.includes(movieId);
    } catch (err) {
      throw new Error("Error when updating watch history", err);
    }
  }

  async updateUserRateMovie(username, movieId, rate) {
    try {
      await this.mongooseService.findOneAndUpdate(
        { username },
        {
          $pull: {
            rates: { movieId: movieId },
          },
        }
      );
      const result = await this.mongooseService.findOneAndUpdate(
        { username },
        {
          $push: {
            rates: { movieId: movieId, rate },
          },
        }
      );

      return result.rates.find((rate) => rate.movieId == movieId)?.rate;
    } catch (err) {
      console.log(err);
      throw new Error("Error when updating rate of movie", err);
    }
  }

  async checkIfUserExist(username, email) {
    try {
      return await this.mongooseService.count({ $or: [{ username }, { email }] });
    } catch (err) {
      throw new Error("Error when checking if user exist", err);
    }
  }

  validateSignup(email, password, username) {
    if (email === "" || password === "" || username === "") {
      return { success: false, message: "Provide email, password and username" };
    }

    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: "Provide a valid email address." };
    }

    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return {
        success: false,
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      };
    }
    return { success: true };
  }

  validateResetPassword(password1, password2) {
    if (password1 === "" || password2 === "") {
      return { success: false, message: "Provide password and retype password" };
    }

    if (password1 !== password2) {
      return { success: false, message: "Passwords must match" };
    }
    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password1)) {
      return {
        success: false,
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      };
    }
    return { success: true };
  }

  validateLogin(email, password) {
    if (email === "" || password === "") {
      return { success: false, message: "Provide email and password." };
    }
    return { success: true };
  }

  async getUserPreferredMovies(username, length) {
    try {
      const userRates = await this.mongooseService.findOne({ username }, { rates: 1, _id: 0 });
      if (userRates.rates.length < length) return [];
      const preferedMovies = userRates.rates
        .sort((a, b) => b.rate - a.rate)
        .slice(0, length)
        .map((rate) => rate.movieId);
      return preferedMovies;
    } catch (err) {
      throw new Error("Error when getting preferred movies", err);
    }
  }
  async getUserMoviesRecommandations(username) {
    try {
      const preferredMoviesIds = await this.getUserPreferredMovies(username, 3);
      return await this.movieService.getRecommandationsFromMovies(preferredMoviesIds);
    } catch (err) {
      console.log(err);
      throw new Error("Error when getting movies recommandations", err);
    }
  }
}

module.exports = UserService;
