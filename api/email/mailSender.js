const {errorModal} = require('../middleware/verificationsAndValidations');
const returnMailWrap = require('./Templates/mailWrapper');
const {newRegistrationMail} = require('./Templates/newRegistrationMail');
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  auth: {
      user: process.env.NODE_MAILER_MAIL,
      pass: process.env.NODE_MAILER_PASS,
  },
});
const sendMail = (request, response) => {
    const email = request.user?.email;
    const first_name = request.user?.name.first_name;
    const last_name = request.user?.name.last_name;
    const field_data = {
        name:first_name+" "+last_name,
        password:request.user?.password,
        email
    }
    let mailOptions = {
        from: "monkeyappsupport@cublearner.org",
        to: email,
        subject: "Weclome to Gurugram University Coding Club",
        html: returnMailWrap(newRegistrationMail(field_data))
    }
    transporter.sendMail(mailOptions, function (error, result) {
        if (error) {
            console.log("Failed to send verification mail", error);
            return response.status(500).send(errorModal("server", "server", "Server error try again!"));
        } else {
            console.log("Verification mail sent : " + result.response);
            return response.status(201).send("Send Success");
        }
    });
};
module.exports = sendMail;