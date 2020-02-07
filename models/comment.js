let mongoose = require("mongoose");

let CommentSchema = new mongoose.Schema({
    username: String,
    text: String
});

module.exports = mongoose.model("Comment", CommentSchema);