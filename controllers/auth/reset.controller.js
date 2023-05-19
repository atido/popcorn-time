function getResetForm(req, res, next) {
  res.render("auth/reset", { layout: "layoutSimple" });
}

module.exports = { getResetForm };
