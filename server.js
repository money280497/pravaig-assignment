const express = require("express");
require("./db/mongoose");
const UserSchema = require("./model/UserSchema");
const mail = require("./mail");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.post("/user", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const phone = req.body.phone;
  UserSchema.findOne({ email, phone })
    .then((response) => {
      console.log(response);
      if (response) {
        return res.json({ response });
      } else {
        var newUser = new UserSchema({ email, phone: parseInt(phone) });
        newUser.save((err, result) => {
          if (!err) {
            mail.sendEmail(email, result.count);
            console.log("mail sent");
            res.json({ response: result });
          } else {
            console.log("error", err);
          }
        });
      }
    })
    .catch((err) => res.status(400).json({ success: err }));
});

app.listen("5000", () => {
  console.log("Server has started");
});
