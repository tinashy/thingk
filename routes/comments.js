const express = require("express");
const app = express();
const router = express.Router({mergeParams: true});
const Thingk = require("../models/thingk");
const Comment = require("../models/comment");

/* ----------------------- COMMENT ROUTES ---------------------------- */

//Comment New Route
router.get("/new",isLoggedIn, (req, res) => {
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
router.post("/",isLoggedIn, (req, res) => {
  Thingk.findById(req.params.id, (err, foundThingk) => {
    if (err) {
      console.log("Error finding thingk to comment on: " + err);
    } else {
      let comment = {
        author: {
          id: req.user._id,
          username: req.user.username
        },
        text: req.body.comment.text
      }
      Comment.create(comment, (err, createdComment) => {
        if (err) {
          console.log("Error creating comment: " + err);
        } else {
          foundThingk.comments.push(createdComment);
          foundThingk.save((err, data) => {
            if (err) {
              console.log("Error saving new thingk with comment: " + err);
            } else {
              console.log(createdComment);
              res.redirect("/thingks/" + req.params.id);
            }
          });
        }
      });
    }
  });
});

//Comment Edit Route
router.get("/:comment_id/edit",checkCommentOwnership, (req, res) => {
  Thingk.findById(req.params.id, (err, foundThingk) => {
    if(err) {
      console.log("Error finding thingk: " + err);
    } else {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          console.log("Error finding comment: " + err);
        } else {
          res.render("comments/edit", {
            comment: foundComment,
            thingk: foundThingk
          });
        }
      });
    }
  });
});

//Comment Update Route
router.put("/:comment_id",checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if(err) {
      console.log("Error updating comment: " + err);
    } else {
      res.redirect("/thingks/" + req.params.id);
    }
  });
});

//Middleware to check Comment Ownership
function checkCommentOwnership (req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        console.log("Error finding comment: " + err);
      } else {
        if(req.user._id.equals(foundComment.author.id)) {
          next();
        } else {
          res.send("You don't have authorization to do that");
        }
      }
    });
  } else {
    res.send("You need to be logged in to do that");
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("You need to be logged in to do that!");
  }
}

module.exports = router;