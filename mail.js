var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Your Email",
    pass: "Your Password",
  },
});

module.exports = {
  sendEmail: function (email, count) {
    const mailOptions = {
      from: "mohitmehta368@gmail.com",
      to: email,
      subject: "Pravaig Assignment",
      html: `Your Waiting number is ${count} <br/>
            Task Completed <br/><br/>
                Mohit Mehta`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  },
};
