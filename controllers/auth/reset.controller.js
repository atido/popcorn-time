function getResetForm(req, res, next) {
  res.render("auth/reset", { layout: "layouts/auth" });
}

module.exports = { getResetForm };
