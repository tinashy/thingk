const express = require("express");
const app = express();
const router = express.Router();
const Thingk = require("../models/thingk");

/* ------------------------------- THINGK ROUTES ------------------------------------------- */

//Index Route
router.get("/", (req, res) => {
  Thingk.find({}, (err, foundThingks) => {
    if (err) {
      console.log("error finding thingks to show: " + err);
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
      console.log("Error creating new product: " + err);
    } else {
      res.redirect("/thingks");
    }
  })
});

//Show Route
router.get("/:id", (req, res) => {
  Thingk.findById(req.params.id).populate("comments").exec((err, foundThingk) => {
    if (err) {
      console.log("Error finding thingk to show: " + err);
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
      console.log("Error finding thingk to edit: " + err);
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
      console.log("Error updating thingk: " + err);
    } else {
      res.redirect("/thingks/" + req.params.id);
    }
  });
});

//Destroy Route
router.delete("/:id",checkThingkOwnership, (req, res) => {
  Thingk.findByIdAndDelete(req.params.id, (err, deletedThingk) => {
    if (err) {
      console.log("Error deleting thingk: " + err);
    } else {
      console.log(deletedThingk);
      res.redirect("/thingks");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send("You need to be logged in to do that!");
  }
}

//Middleware to check thingk ownership
function checkThingkOwnership (req, res, next) {
  if(req.isAuthenticated()) {
    Thingk.findById(req.params.id, (err, foundThingk) => {
      if(err) {
        console.log("Error finding thingk: " + err);
      } else {
        if(req.user._id.equals(foundThingk.author.id)) {
          next();
        } else {
          res.send("You don't have authorization to do that!");
        }
      }
    })
  } else {
    res.send("You need to be logged in to do that!");
  }
}

module.exports = router;