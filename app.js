let express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Thingk = require("./models/thingk"),
  Comment = require("./models/comment"),
  port = 8080;

let app = express();

//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/thingk", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//expecting files from the '/public' dir automatically
app.use(express.static(__dirname + "/public"));
//body-parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//setting view engine to EJS
app.set("view engine", "ejs");

//Initial Route
app.get("/", (req, res) => {
  res.render("landing");
});

//Index Route
app.get("/thingk", (req, res) => {
  res.send("thingk index route working!");
});

//Catch-all Route
app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND... WHAT ARE YOU DOING WITH YOUR LIFE!");
});

//Listening to routes on local server
app.listen(port, () => console.log("SERVER STARTED ON PORT: " + port));
