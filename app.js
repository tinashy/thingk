let express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Thingk = require("./models/thingk"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    port = 8080;

let app = express();

//seeding the database
//seedDB();

//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/thingk", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//expecting files from the '/public' dir automatically
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
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
app.get("/thingks", (req, res) => {
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
app.get("/thingks/new", (req, res) => {
    res.render("thingks/new");
});

//Create Route
app.post("/thingks", (req, res) => {
    let newProduct = {
        name: req.body.thingk.name,
        image: req.body.thingk.image,
        desc: req.body.thingk.desc,
        price: Number(req.body.thingk.price)
    }

    Thingk.create(newProduct, (err, createdThingk) => {
        if(err) {
            console.log("Error creating new product: " + err);
        } else {
            res.redirect("/thingks");
        }
    })
});

//Show Route
app.get("/thingks/:id", (req, res) => {
    Thingk.findById(req.params.id, (err, foundThingk) => {
        if(err) {
            console.log("Error finding thingk to show: " + err);
        } else {
            res.render("thingks/show", {
                thingk: foundThingk
            });
        }
    })
});

//Destroy Route
app.delete("/thingks/:id", (req, res) => {
    Thingk.findByIdAndDelete(req.params.id, (err, deletedThingk) => {
        if(err) {
            console.log("Error deleting thingk: " + err);
        } else {
            console.log(deletedThingk);
            res.redirect("/thingks");
        }
    });
});

//Catch-all Route
app.get("*", (req, res) => {
    res.send("PAGE NOT FOUND... WHAT ARE YOU DOING WITH YOUR LIFE!");
});

//Listening to routes on local server
app.listen(port, () => console.log("SERVER STARTED ON PORT: " + port));

//next up is destroy routes