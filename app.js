let express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Thingk = require("./models/thingk"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    LocalStrategyMongoose = require("passport-local-mongoose"),
    flash = require("connect-flash");

let app = express();

//seeding the database
//seedDB();

//connecting to mongodb
mongoose.connect("mongodb+srv://dan:dan3%2321q@yelpclone-ipcpx.mongodb.net/thingk", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//expecting files from the '/public' dir automatically
app.use(express.static(__dirname + "/public"));
//method-override
app.use(methodOverride("_method"));
//body-parser
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
//setting view engine to EJS
app.set("view engine", "ejs");
app.use(flash());

//---------- Cookie-session & Passport Setup ----------------
app.use(require("cookie-session")({
    secret: "we all need a little validation :)",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passing current user to all res.locals
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//------------------ requiring ROUTES ------------------------
const thingks = require("./routes/thingks");
const comments = require("./routes/comments");
const index = require("./routes/index");

app.use("/thingks",thingks);
app.use("/thingks/:id/comments",comments);
app.use(index);

//Listening to routes on heroku server

app.listen(process.env.PORT || 3000, () => {
    console.log("SERVER STARTED!!");
});

//next up Data Association