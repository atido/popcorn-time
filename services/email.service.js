const SibApiV3Sdk = require("sib-api-v3-sdk");

class EmailService {
  constructor() {}
  async sendEmail(email, resetLink) {
    SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.EMAIL_API_KEY;

    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        subject: "PCT - Password reset submission",
        sender: { email: "cedaim25@hotmail.fr", name: "Cedric" },
        replyTo: { email: "cedaim25@hotmail.fr", name: "Cedric" },
        to: [{ email }],
        htmlContent:
          "<html><body><h1>Your password request link</h1><a href={{params.resetLink}}>{{params.resetLink}}</a></body></html>",
        params: { resetLink },
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
}
module.exports = EmailService;
