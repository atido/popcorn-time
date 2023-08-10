const UserService = require("../../services/user.service");
const MongooseService = require("../../repository/mongoose.service");
let userService = null;

jest.mock("../../repository/mongoose.service");

beforeAll(() => {
  userService = new UserService();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserService", () => {
  describe("create userService instance", () => {
    test("userService to be defined", () => {
      expect(userService).toBeDefined();
    });
  });
  describe("validateLogin", () => {
    it("returns an error message if email or password is empty", () => {
      expect(userService.validateLogin("", "password")).toEqual({
        success: false,
        message: "Provide email and password.",
      });
      expect(userService.validateLogin("user@example.com", "")).toEqual({
        success: false,
        message: "Provide email and password.",
      });
    });

    it("returns a success message if email and password are provided", () => {
      expect(userService.validateLogin("user@example.com", "password")).toEqual({
        success: true,
      });
    });
  });

  describe("validateSignup", () => {
    it("returns an error message if email, password or username is empty", () => {
      expect(userService.validateSignup("", "password", "username")).toEqual({
        success: false,
        message: "Provide email, password and username",
      });
      expect(userService.validateSignup("user@example.com", "", "username")).toEqual({
        success: false,
        message: "Provide email, password and username",
      });
      expect(userService.validateSignup("user@example.com", "password", "")).toEqual({
        success: false,
        message: "Provide email, password and username",
      });
    });

    it("returns an error message if email is not valid", () => {
      expect(userService.validateSignup("userexample.com", "password", "username")).toEqual({
        success: false,
        message: "Provide a valid email address.",
      });
      expect(userService.validateSignup("user@example", "password", "username")).toEqual({
        success: false,
        message: "Provide a valid email address.",
      });
    });

    it("returns an error message if password is not valid", () => {
      expect(userService.validateSignup("user@example.com", "password", "username")).toEqual({
        success: false,
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      expect(userService.validateSignup("user@example.com", "password123", "username")).toEqual({
        success: false,
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      expect(userService.validateSignup("user@example.com", "PASSWORD", "username")).toEqual({
        success: false,
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
    });

    it("returns a success message if all fields are valid", () => {
      expect(userService.validateSignup("user@example.com", "Password123", "username")).toEqual({
        success: true,
      });
    });
  });
  describe("create", () => {
    it("should create a new user", async () => {
      const userToCreate = {
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      const createdUser = { _id: "123", ...userToCreate };
      MongooseService.prototype.create.mockResolvedValue(createdUser);

      const result = await userService.createUser(
        userToCreate.email,
        userToCreate.password,
        userToCreate.username
      );

      expect(MongooseService.prototype.create).toHaveBeenCalledWith(userToCreate);
      expect(result).toEqual(createdUser);
    });

    it("should throw an error if there is an error creating a user", async () => {
      const userToCreate = {
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      const error = new Error("Something went wrong");
      MongooseService.prototype.create.mockRejectedValue(error);

      await expect(
        userService.createUser(userToCreate.email, userToCreate.password, userToCreate.username)
      ).rejects.toThrowError("Error when creating user");
    });
  });

  describe("getUserByEmail", () => {
    it("should find a user", async () => {
      const query = { email: "john.doe@example.com" };
      const foundUser = {
        _id: "123",
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      MongooseService.prototype.findOne.mockResolvedValue(foundUser);

      const result = await userService.getUserByEmail(query.email);

      expect(MongooseService.prototype.findOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(foundUser);
    });

    it("should throw an error if there is an error finding a user", async () => {
      const email = "john.doe@example.com";
      const error = new Error("Something went wrong");
      MongooseService.prototype.findOne.mockRejectedValue(error);

      await expect(userService.getUserByEmail(email)).rejects.toThrowError(
        "Error when finding user"
      );
    });
  });

  describe("getUserByUsername", () => {
    it("should find a user", async () => {
      const query = { username: "johndoe" };
      const foundUser = {
        _id: "123",
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      MongooseService.prototype.findOne.mockResolvedValue(foundUser);

      const result = await userService.getUserByUsername(query.username);

      expect(MongooseService.prototype.findOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(foundUser);
    });

    it("should throw an error if there is an error finding a user", async () => {
      const username = "johndoe";
      const error = new Error("Something went wrong");
      MongooseService.prototype.findOne.mockRejectedValue(error);

      await expect(userService.getUserByUsername(username)).rejects.toThrowError(
        "Error when finding user"
      );
    });
  });

  describe("getUserById", () => {
    it("should find a user", async () => {
      const query = { _id: "123" };
      const foundUser = {
        _id: "123",
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      MongooseService.prototype.findOne.mockResolvedValue(foundUser);

      const result = await userService.getUserById(query._id);

      expect(MongooseService.prototype.findOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(foundUser);
    });

    it("should throw an error if there is an error finding a user", async () => {
      const id = "123";
      const error = new Error("Something went wrong");
      MongooseService.prototype.findOne.mockRejectedValue(error);

      await expect(userService.getUserById(id)).rejects.toThrowError("Error when finding user");
    });
  });

  describe("checkIfUserExist", () => {
    it("should return the count of matching users based on username or email", async () => {
      const mockCount = 2;
      MongooseService.prototype.count.mockResolvedValue(mockCount);

      const result = await userService.checkIfUserExist("username", "email");

      expect(MongooseService.prototype.count).toHaveBeenCalledWith({
        $or: [{ username: "username" }, { email: "email" }],
      });
      expect(result).toBe(mockCount);
    });
    it("should return 0 if no matching users are found", async () => {
      const mockCount = 0;
      MongooseService.prototype.count.mockResolvedValue(mockCount);

      const result = await userService.checkIfUserExist("username", "email");

      expect(MongooseService.prototype.count).toHaveBeenCalledWith({
        $or: [{ username: "username" }, { email: "email" }],
      });
      expect(result).toBe(mockCount);
    });
    it("should handle errors and throw an error when counting users", async () => {
      const mockError = new Error("Database connection error");
      MongooseService.prototype.count.mockRejectedValue(mockError);

      await expect(userService.checkIfUserExist("username", "email")).rejects.toThrowError(
        "Error when checking if user exist"
      );
    });
  });

  describe("toggleUserWatchHistory", () => {
    it("should add movieId to the watched array if it is not already present", async () => {
      const username = "john.doe";
      const movieId = "123";

      const mockUpdatedDocument = {
        watched: ["456", "123"],
      };
      MongooseService.prototype.findOneAndUpdate.mockResolvedValue(mockUpdatedDocument);
      const result = await userService.toggleUserWatchHistory(username, movieId);

      expect(MongooseService.prototype.findOneAndUpdate).toHaveBeenCalledWith({ username }, [
        {
          $set: {
            watched: {
              $cond: [
                { $in: ["123", "$watched"] },
                { $setDifference: ["$watched", ["123"]] },
                { $concatArrays: ["$watched", ["123"]] },
              ],
            },
          },
        },
      ]);
      expect(result).toBe(true);
    });

    it("should remove movieId from the watched array if it is already present", async () => {
      const username = "john.doe";
      const movieId = "123";

      const mockUpdatedDocument = {
        watched: ["456"],
      };
      MongooseService.prototype.findOneAndUpdate.mockResolvedValue(mockUpdatedDocument);
      const result = await userService.toggleUserWatchHistory(username, movieId);

      expect(MongooseService.prototype.findOneAndUpdate).toHaveBeenCalledWith({ username }, [
        {
          $set: {
            watched: {
              $cond: [
                { $in: ["123", "$watched"] },
                { $setDifference: ["$watched", ["123"]] },
                { $concatArrays: ["$watched", ["123"]] },
              ],
            },
          },
        },
      ]);
      expect(result).toBe(false);
    });

    it("should handle errors and throw an error when updating watch history", async () => {
      const username = "john.doe";
      const movieId = "123";
      const mockError = new Error("Database connection error");

      MongooseService.prototype.findOneAndUpdate.mockRejectedValue(mockError);

      await expect(userService.toggleUserWatchHistory(username, movieId)).rejects.toThrowError(
        "Error when updating watch history"
      );
    });
  });
  describe("toggleUserWatchList", () => {
    it("should remove movie to watchlist if present", async () => {
      const username = "john.doe";
      const movieId = "123";

      const mockUpdatedDocument = {
        watchList: ["456"],
      };
      MongooseService.prototype.findOneAndUpdate.mockResolvedValue(mockUpdatedDocument);
      const result = await userService.toggleUserWatchList(username, movieId);

      expect(MongooseService.prototype.findOneAndUpdate).toHaveBeenCalledWith({ username }, [
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
      expect(result).toBe(false);
    });

    it("should add movie to watchlist if not present", async () => {
      const username = "john.doe";
      const movieId = "123";

      const mockUpdatedDocument = {
        watchList: ["123", "456"],
      };
      MongooseService.prototype.findOneAndUpdate.mockResolvedValue(mockUpdatedDocument);
      const result = await userService.toggleUserWatchList(username, movieId);

      expect(MongooseService.prototype.findOneAndUpdate).toHaveBeenCalledWith({ username }, [
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
      expect(result).toBe(true);
    });

    it("should throw an error when an error occurs when updating watch list", async () => {
      const username = "john.doe";
      const movieId = "123";

      const error = new Error("Something went wrong");
      MongooseService.prototype.findOneAndUpdate.mockRejectedValue(error);

      await expect(userService.toggleUserWatchList(username, movieId)).rejects.toThrowError(
        "Error when updating watch history"
      );
    });
  });
});
