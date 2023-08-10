const TokenService = require("../../services/token.service");
const MongooseService = require("../../repository/mongoose.service");
let tokenService = null;

jest.mock("../../repository/mongoose.service");

describe("Token Service", () => {
  beforeAll(() => {
    tokenService = new TokenService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createToken", () => {
    it("should create a new token", async () => {
      const userId = "12345";
      const token = "abcdef";
      const createdAt = new Date();

      const createdToken = { _id: "123", userId, token, createdAt };

      MongooseService.prototype.create.mockResolvedValue(createdToken);

      const result = await tokenService.createToken(userId, token, createdAt);

      expect(MongooseService.prototype.create).toHaveBeenCalledWith({ userId, token, createdAt });
      expect(result).toEqual(createdToken);
    });

    it("should throw an error when an error occurs during token creation", async () => {
      const userId = "12345";
      const token = "abcdef";
      const createdAt = new Date();
      const error = new Error("Database error");

      MongooseService.prototype.create.mockRejectedValue(error);

      await expect(tokenService.createToken(userId, token, createdAt)).rejects.toThrowError(
        "Error when creating token"
      );
      expect(MongooseService.prototype.create).toHaveBeenCalledWith({ userId, token, createdAt });
    });
  });

  describe("getTokenByUserId", () => {
    it("should return the token for a valid userId", async () => {
      const userId = "12345";
      const createdToken = {
        _id: "token_id",
        userId,
        token: "abcdef",
        createdAt: new Date(),
      };

      MongooseService.prototype.findOne.mockResolvedValue(createdToken);

      const result = await tokenService.getTokenByUserId(userId);

      expect(MongooseService.prototype.findOne).toHaveBeenCalledWith({ userId });
      expect(result).toEqual(createdToken);
    });

    it("should throw an error when an error occurs during finding the token", async () => {
      const userId = "12345";
      const error = new Error("Database error");

      MongooseService.prototype.findOne.mockRejectedValue(error);

      await expect(tokenService.getTokenByUserId(userId)).rejects.toThrowError(
        "Error when finding token"
      );
      expect(MongooseService.prototype.findOne).toHaveBeenCalledWith({ userId });
    });
  });

  describe("delete", () => {
    it("should delete the token with the given id", async () => {
      const tokenId = "token_id";

      MongooseService.prototype.delete.mockResolvedValue(true);

      const result = await tokenService.delete(tokenId);

      expect(MongooseService.prototype.delete).toHaveBeenCalledWith(tokenId);
      expect(result).toBe(true);
    });

    it("should throw an error when an error occurs during token deletion", async () => {
      const tokenId = "token_id";
      const error = new Error("Database error");

      MongooseService.prototype.delete.mockRejectedValue(error);

      await expect(tokenService.delete(tokenId)).rejects.toThrowError("Error when deleting token");
      expect(MongooseService.prototype.delete).toHaveBeenCalledWith(tokenId);
    });
  });
});
