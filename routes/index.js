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
      req.flash("error", err.message);
      res.redirect("/signup");
    } else {
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to ThinGKs " + createdUser.username);
        res.redirect("/thingks");
      });
    }
  });
});

//login routes
router.get("/login", (req, res) => {
  res.render("login", {
    message: req.flash("error", res.error)
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/thingks",
  failureRedirect: "/login",
  failureFlash: true
}), (req, res) => {

});

//logout route
router.get("/logout", (req, res) => {
  req.flash("success", "See you next time " + req.user.username + "!");
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
    req.flash("error", "You need to be logged in to do that :(");
    res.redirect("back");
  }
}


module.exports = router;