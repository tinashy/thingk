const express = require("express");
const app = express();
const router = express.Router({mergeParams: true});
const Thingk = require("../models/thingk");
const Comment = require("../models/comment");

/* ----------------------- COMMENT ROUTES ---------------------------- */

//Comment New Route
router.get("/new", (req, res) => {
  Thingk.findById(req.params.id, (err, foundThingk) => {
    if (err) {
      console.log("Error finding thingk to comment on: " + err);
    } else {
      res.render("comments/new", {
        thingk: foundThingk
      });
    }
  });
});

//Comment Create Route
router.post("/", (req, res) => {
  Thingk.findById(req.params.id, (err, foundThingk) => {
    if (err) {
      console.log("Error finding thingk to comment on: " + err);
    } else {
      Comment.create(req.body.comment, (err, createdComment) => {
        if (err) {
          console.log("Error creating comment: " + err);
        } else {
          foundThingk.comments.push(createdComment);
          foundThingk.save((err, data) => {
            if (err) {
              console.log("Error saving new thingk with comment: " + err);
            } else {
              res.redirect("/thingks/" + req.params.id);
            }
          });
        }
      });
    }
  });
});

module.exports = router;