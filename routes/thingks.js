const express = require("express");
const app = express();
const router = express.Router();
const Thingk = require("../models/thingk");

/* ------------------------------- THINGK ROUTES ------------------------------------------- */

//Index Route
router.get("/thingks", (req, res) => {
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
router.get("/thingks/new", (req, res) => {
  res.render("thingks/new");
});

//Create Route
router.post("/thingks", (req, res) => {
  let newProduct = {
    name: req.body.thingk.name,
    image: req.body.thingk.image,
    desc: req.body.thingk.desc,
    price: Number(req.body.thingk.price)
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
router.get("/thingks/:id", (req, res) => {
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
router.get("/thingks/:id/edit", (req, res) => {
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
router.put("/thingks/:id", (req, res) => {
  Thingk.findByIdAndUpdate(req.params.id, req.body.thingk, (err, updatedThingk) => {
    if (err) {
      console.log("Error updating thingk: " + err);
    } else {
      res.redirect("/thingks/" + req.params.id);
    }
  });
});

//Destroy Route
router.delete("/thingks/:id", (req, res) => {
  Thingk.findByIdAndDelete(req.params.id, (err, deletedThingk) => {
    if (err) {
      console.log("Error deleting thingk: " + err);
    } else {
      console.log(deletedThingk);
      res.redirect("/thingks");
    }
  });
});

module.exports = router;