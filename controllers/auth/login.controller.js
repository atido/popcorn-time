const bcrypt = require("bcrypt");

const UserService = require("../../services/user.service");
const userService = new UserService();

function getLoginForm(req, res, next) {
  res.render("auth/login", { layout: "layouts/auth" });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const result = userService.validateLogin(email, password);
  if (!result.success)
    return res.render("auth/login", {
      layout: "layouts/auth",
      message: result.message,
    });

  try {
    const foundUser = await userService.getUserByEmail(email);
    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      const { _id, email, username, avatar = "/images/avatar.png" } = foundUser;
      req.session.currentUser = { _id, email, username, avatar };
      return res.redirect("/dashboard");
    } else {
      return res.status(401).render("auth/login", {
        layout: "layouts/auth",
        message: "Wrong email or password",
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { getLoginForm, login };
