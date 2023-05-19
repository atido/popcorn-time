const UserService = require("../../services/user.service");
const userService = new UserService();

function getSignupForm(req, res, next) {
  res.render("auth/signup", { layout: "layoutSimple" });
}

async function createSignup(req, res, next) {
  const { email, password, username } = req.body;

  const result = userService.validateSignup(email, password, username);
  if (!result.success) return res.render("auth/signup", { message: result.message });
  // Check the users collection if a user with the same email already exists and then create user
  try {
    const foundUser = await userService.findOne({ email });
    if (foundUser) {
      return res.render("auth/signup", {
        layout: "layoutSimple",
        data: { message: "User already exists" },
      });
    }
    await userService.create({ email, password, username });
    return res.render("profile");
  } catch (err) {
    next(err);
  }
}

module.exports = { getSignupForm, createSignup };
