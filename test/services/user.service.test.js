const UserService = require("../../services/user.service");
const MongooseService = require("../../services/mongoose.service");
let userService = null;

jest.mock("../../services/mongoose.service");

beforeAll(async () => {
  userService = new UserService();
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

      const result = await userService.create(userToCreate);

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

      await expect(userService.create(userToCreate)).rejects.toThrowError(
        "Error when creating user"
      );
    });
  });

  describe("findOne", () => {
    it("should find a user", async () => {
      const query = { email: "john.doe@example.com" };
      const foundUser = {
        _id: "123",
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      MongooseService.prototype.findOne.mockResolvedValue(foundUser);

      const result = await userService.findOne(query);

      expect(MongooseService.prototype.findOne).toHaveBeenCalledWith(query);
      expect(result).toEqual(foundUser);
    });

    it("should throw an error if there is an error finding a user", async () => {
      const query = { email: "john.doe@example.com" };
      const error = new Error("Something went wrong");
      MongooseService.prototype.findOne.mockRejectedValue(error);

      await expect(userService.findOne(query)).rejects.toThrowError("Error when finding user");
    });
  });

  describe("delete", () => {
    it("should delete a user", async () => {
      const id = "123";
      const deletedUser = {
        _id: "123",
        email: "john.doe@example.com",
        password: "password123",
        username: "johndoe",
      };
      MongooseService.prototype.delete.mockResolvedValue(deletedUser);

      const result = await userService.delete(id);

      expect(MongooseService.prototype.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deletedUser);
    });

    it("should throw an error if there is an error deleting a user", async () => {
      const id = "123";
      const error = new Error("Something went wrong");
      MongooseService.prototype.delete.mockRejectedValue(error);

      await expect(userService.delete(id)).rejects.toThrowError("Error when deleting user");
    });
  });
});
