const MongooseService = require("./mongoose.service");
const TokenModel = require("../models/Token.model");

class TokenService {
  constructor() {
    this.mongooseService = new MongooseService(TokenModel);
  }

  async createToken(userId, token, createdAt) {
    try {
      return await this.mongooseService.create({ userId, token, createdAt });
    } catch (err) {
      throw new Error("Error when creating token", err);
    }
  }

  async getTokenByUserId(userId) {
    try {
      return await this.mongooseService.findOne({ userId });
    } catch (err) {
      throw new Error("Error when finding token", err);
    }
  }

  async delete(id) {
    try {
      return await this.mongooseService.delete(id);
    } catch (err) {
      throw new Error("Error when deleting token", err);
    }
  }
}
module.exports = TokenService;
