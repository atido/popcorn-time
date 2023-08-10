const UserService = require("../../services/user.service");
const userService = new UserService();
const TokenService = require("../../services/token.service");
const tokenService = new TokenService();
const EmailService = require("../../services/email.service");
const emailService = new EmailService();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

function getRequestResetForm(req, res, next) {
  res.render("auth/reset-request", { layout: "layouts/auth" });
}

async function requestPasswordReset(req, res, next) {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    if (!user) {
      return res.render("auth/reset-request", {
        layout: "layouts/auth",
        message: "Email does not exist",
      });
    }

    const token = await tokenService.getTokenByUserId(user._id);
    if (token) await token.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

    await tokenService.createToken(user.id, hash, Date.now());
    const link = `${process.env.CLIENT_URL}/auth/resetPassword?token=${resetToken}&id=${user._id}`;

    await emailService.sendEmail(user.email, link);

    return res.render("auth/reset-request", {
      layout: "layouts/auth",
      message: "e-mail was sent successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
async function getNewPasswordForm(req, res, next) {
  try {
    const { id: userId, token } = req.query;

    let passwordResetToken = await tokenService.getByUserId(userId);
    if (!passwordResetToken) {
      return res.render("auth/reset-invalidate", {
        layout: "layouts/auth",
        message: "Invalid or expired password reset token",
      });
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      return res.render("auth/reset-invalidate", {
        layout: "layouts/auth",
        message: "Invalid or expired password reset token",
      });
    }
    const user = await userService.getUserByParameter(id);
    if (!user) {
      return res.render("auth/reset-invalidate", {
        layout: "layouts/auth",
        message: "Invalid or expired password reset token",
      });
    }
    req.session.currentUserEmail = user.email;
    await passwordResetToken.deleteOne();
    return res.render("auth/new-password", {
      layout: "layouts/auth",
    });
  } catch (err) {
    next(err);
  }
}
async function resetPassword(req, res, next) {
  try {
    const { password1, password2 } = req.body;
    const emailFromSession = req.session.currentUserEmail;

    const result = userService.validateResetPassword(password1, password2);
    if (!result.success)
      return res.render("auth/new-password", { layout: "layouts/auth", message: result.message });

    const user = await userService.getUserByEmail(emailFromSession);
    user.password = password1;
    user.save();
    const { _id, email, username, avatar = "/images/avatar.png" } = user;
    req.session.currentUser = { _id, email, username, avatar };
    return res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
}

module.exports = { getRequestResetForm, requestPasswordReset, getNewPasswordForm, resetPassword };
