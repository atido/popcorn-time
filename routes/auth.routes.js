const express = require("express");
const router = express.Router();

const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");

const SignupController = require("../controllers/auth/signup.controller.js");
const LoginController = require("../controllers/auth/login.controller.js");
const ResetController = require("../controllers/auth/reset.controller.js");

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res, next) =>
  SignupController.getSignupForm(req, res, next)
);

// POST /auth/signup  - Creates a new signup for submitted user in the database
router.post("/signup", isLoggedOut, (req, res, next) =>
  SignupController.createSignup(req, res, next)
);

// GET /auth/login
router.get("/login", isLoggedOut, (req, res, next) => LoginController.getLoginForm(req, res, next));

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", isLoggedOut, (req, res, next) => LoginController.login(req, res, next));

// GET  /auth/verify  -  Used the token in session
router.get("/verify", isLoggedIn, (req, res, next) => {
  console.log(`req.session.currentUser`, req.session.currentUser);
  res.status(200).json(req.session.currentUser);
});

// GET  /auth/reset  -  reset password form
router.get("/reset", isLoggedOut, (req, res, next) => ResetController.getResetForm(req, res, next));

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { layouts: "layouts/auth", message: err.message });
      return;
    }
    res.redirect("/");
  });
});

module.exports = router;
