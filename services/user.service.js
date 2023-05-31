const MongooseService = require("./mongoose.service");
const UserModel = require("../models/User.model");

class UserService {
  constructor() {
    this.mongooseService = new MongooseService(UserModel);
  }

  async create(userToCreate) {
    try {
      return await this.mongooseService.create(userToCreate);
    } catch (err) {
      throw new Error("Error when creating user", err);
    }
  }

  async findOne(query) {
    try {
      return await this.mongooseService.findOne(query);
    } catch (err) {
      throw new Error("Error when finding user", err);
    }
  }

  async findOneAndUpdate(query, body) {
    try {
      return await this.mongooseService.findOneAndUpdate(query, body);
    } catch (err) {
      console.log(err);
      throw new Error("Error when finding user", err);
    }
  }

  async delete(id) {
    try {
      return await this.mongooseService.delete(id);
    } catch (err) {
      throw new Error("Error when deleting user", err);
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
}

module.exports = UserService;
