const express = require("express");
const app = express();
const router = express.Router();
const Thingk = require("../models/thingk");

/* ------------------------------- THINGK ROUTES ------------------------------------------- */

//Index Route
router.get("/", (req, res) => {
  Thingk.find({}, (err, foundThingks) => {
    if (err) {
      req.flash("error", "Error finding thingks to show");
      res.redirect("back");
    } else {
      res.render("thingks/index", {
        thingks: foundThingks
      });
    }
  });
});

//New Route
router.get("/new",isLoggedIn, (req, res) => {
  res.render("thingks/new");
});

//Create Route
router.post("/",isLoggedIn, (req, res) => {
  let newProduct = {
    name: req.body.thingk.name,
    image: req.body.thingk.image,
    desc: req.body.thingk.desc,
    price: Number(req.body.thingk.price),
    author: {
      id: req.user._id,
      username: req.user.username
    }
  }

  Thingk.create(newProduct, (err, createdThingk) => {
    if (err) {
      req.flash("error", "Error creating new product");
      res.redirect("back");
    } else {
      req.flash("success", "thinGK created :)");
      res.redirect("/thingks");
    }
  })
});

//Show Route
router.get("/:id", (req, res) => {
  Thingk.findById(req.params.id).populate("comments").exec((err, foundThingk) => {
    if (err) {
      req.flash("error", "Error finding thingk to show");
      res.redirect("back");
    } else {
      res.render("thingks/show", {
        thingk: foundThingk
      });
    }
  });
});

//Edit Route
router.get("/:id/edit",checkThingkOwnership, (req, res) => {
  Thingk.findById(req.params.id, (err, foundThingk) => {
    if (err) {
      req.flash("error", "Error finding thingk to edit");
      res.redirect("back");
    } else {
      res.render("thingks/edit", {
        thingk: foundThingk
      });
    }
  });
});

//Update Route
router.put("/:id",checkThingkOwnership, (req, res) => {
  Thingk.findByIdAndUpdate(req.params.id, req.body.thingk, (err, updatedThingk) => {
    if (err) {
      req.flash("error", "Error updating thingk :(");
      res.redirect("back");
    } else {
      req.flash("success", "thinGK updated :)");
      res.redirect("/thingks/" + req.params.id);
    }
  });
});

//Destroy Route
router.delete("/:id",checkThingkOwnership, (req, res) => {
  Thingk.findByIdAndDelete(req.params.id, (err, deletedThingk) => {
    if (err) {
      req.flash("error", "Error deleting thinGK");
      res.redirect("back");
    } else {
      req.flash("success", "ThinGK deleted :)");
      res.redirect("/thingks");
    }
  });
});

//Middleware to check thingk ownership
function checkThingkOwnership (req, res, next) {
  if(req.isAuthenticated()) {
    Thingk.findById(req.params.id, (err, foundThingk) => {
      if(err) {
        req.flash("error", "Error finding thingk");
        res.redirect("back");
      } else {
        if(req.user._id.equals(foundThingk.author.id)) {
          next();
        } else {
          req.flash("error", "You don't have authorization to do that :(");
          res.redirect("back");
        }
      }
    })
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
    res.redirect("/login");
  }
}

module.exports = router;