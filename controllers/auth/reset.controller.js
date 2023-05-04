function getResetForm(req, res, next) {
  res.render("auth/reset");
}

module.exports = { getResetForm };
