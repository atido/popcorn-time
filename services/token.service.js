const MongooseService = require("./mongoose.service");
const TokenModel = require("../models/Token.model");

class TokenService {
  constructor() {
    this.mongooseService = new MongooseService(TokenModel);
  }

  async create(tokenToCreate) {
    try {
      return await this.mongooseService.create(tokenToCreate);
    } catch (err) {
      throw new Error("Error when creating token", err);
    }
  }

  async findOne(query) {
    try {
      return await this.mongooseService.findOne(query);
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
