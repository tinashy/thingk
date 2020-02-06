let express = require("express"),
  bodyParser = require("body-parser"),
  port = 8080;

let app = express();

//
app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");

//Initial Route
app.get("/", (req, res) => {
  res.render("landing");
});

//Catch-all Route
app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND... WHAT ARE YOU DOING WITH YOUR LIFE!");
});

//Listening to routes on local server
app.listen(port, () => console.log("SERVER STARTED ON PORT: " + port));
