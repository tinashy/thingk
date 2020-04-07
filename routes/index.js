const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

//Initial Route
router.get("/", (req, res) => {
  res.render("landing");
});

//---------------------------------- Auth Routes -------------------------------
//new user routes
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, createdUser) => {
    if (err) {
      console.log("Error creating new user: " + err);
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log(createdUser);
        res.redirect("/thingks");
      });
    }
  });
});

//login routes
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/thingks",
  failureRedirect: "/login"
}), (req, res) => {

});

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

//Catch-all Route
router.get("*", (req, res) => {
  res.send("PAGE NOT FOUND... WHAT ARE YOU DOING WITH YOUR LIFE!");
});

function isLoggedIn (req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.send("You need to be logged in to do that!");
  }
}


module.exports = router;