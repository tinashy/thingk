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
      req.flash("error", "Error finding thingk to comment on");
      res.redirect("back");
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
      req.flash("error", "Error finding thingk to comment on");
      res.redirect("back");
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
          req.flash("error", "Error creating comment");
          res.redirect("back");
        } else {
          foundThingk.comments.push(createdComment);
          foundThingk.save((err, data) => {
            if (err) {
              req.flash("error", "Error saving new thingk with comment");
              res.redirect("back");
            } else {
              req.flash("success", "Comment created :)");
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
      req.flash("error", "Error finding thingk to comment on");
      res.redirect("back");
    } else {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          req.flash("error", "Error finding comment");
          res.redirect("back");
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
      req.flash("error", "Error updating comment");
      res.redirect("back");
    } else {
      req.flash("success", "Comment updated :)");
      res.redirect("/thingks/" + req.params.id);
    }
  });
});

//Middleware to check Comment Ownership
function checkCommentOwnership (req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if(err) {
        req.flash("error", "Error finding comment");
        res.redirect("back");
      } else {
        if(req.user._id.equals(foundComment.author.id)) {
          next();
        } else {
          req.flash("error", "You don't have authorization to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that :(");
    res.redirect("/login");
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "You need to be logged in to do that :(");
    res.redirect("back");
  }
}

module.exports = router;