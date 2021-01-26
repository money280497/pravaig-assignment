const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  handleError(error);
}
