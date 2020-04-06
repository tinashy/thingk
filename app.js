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

//---------- Express-session & Passport Setup ----------------
app.use(require("express-session")({
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
    next();
});

//------------------ requiring ROUTES ------------------------
const thingks = require("./routes/thingks");
const comments = require("./routes/comments");
const index = require("./routes/index");

app.use(thingks);
app.use(comments);
app.use(index);

//Listening to routes on local server
app.listen(port, () => console.log("SERVER STARTED ON PORT: " + port));

//next up Data Association