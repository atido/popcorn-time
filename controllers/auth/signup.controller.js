const UserService = require("../../services/user.service");
const userService = new UserService();

function getSignupForm(req, res, next) {
  res.render("auth/signup", { layout: "layouts/auth" });
}

async function createSignup(req, res, next) {
  const { email, password, username } = req.body;

  const result = userService.validateSignup(email, password, username);
  if (!result.success)
    return res.render("auth/signup", { layout: "layouts/auth", message: result.message });

  try {
    const isUserExist = await userService.checkIfUserExist(username, email);
    if (isUserExist) {
      return res.render("auth/signup", {
        layout: "layouts/auth",
        message: "email or username already exists",
      });
    }
    const user = await userService.createUser(email, password, username);
    req.session.currentUser = {
      _id: user._id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
    };
    return res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
}

module.exports = { getSignupForm, createSignup };
