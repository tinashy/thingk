let mongoose = require("mongoose");

let ThingkSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    price: Number,
    externalUrl: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Thingk", ThingkSchema);