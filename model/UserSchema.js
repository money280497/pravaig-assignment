const mongoose = require("mongoose");
mongoose.pluralize(null);
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  count: {
    type: Number,
    unique: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
UserSchema.pre("save", function (next) {
  const userModel = mongoose.model("UserSchema", UserSchema);
  userModel.count().then((res) => {
    this.count = res + 1;
    next();
  });
});
module.exports = mongoose.model("UserSchema", UserSchema);
