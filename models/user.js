const mongoose = require("mongoose");
const LocalStrategyMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(LocalStrategyMongoose);

module.exports = mongoose.model("User", UserSchema);