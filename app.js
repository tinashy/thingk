let express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Thingk = require("./models/thingk"),
    Comment = require("./models/comment"),
    port = 8080;

let app = express();

//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/thingk", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//expecting files from the '/public' dir automatically
app.use(express.static(__dirname + "/public"));
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

Thingk.create({
    name: "The One That Started It All",
    image: "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/resize=width:2400,fit:crop/output=quality:70/compress/https://process.fs.grailed.com/z0qM3P5pR3a9viT9MCon",
    desc: "Whatever adjective you want to ascribe to it, the most telling thing about the Air Jordan 1 is that the Air Jordan 1 exists because Michael Jordan didn't want to sign with Nike. As history would have it, Jordan's favorite shoe to ball in during college was Converse's Chuck Taylor, a shoe that no one would dream of seriously playing in today. But Jordan loved the shoe and wanted to sign with Converse as his career in the NBA began. Nike drove a hard bargain(going so far as to ask his parents to drag him to Nike 's campus in Beaverton, Oregon). The pitch from Nike was comprehensive: they were going to create a whole brand around Jordan, push him forward as the face for the brand, and make his wildest dreams come true. But Jordan wasn’t convinced: he didn’t like the shoes – Nike’s soles were too thick, he couldn’t feel the court under his feet. Nike capitulated on that point, it was an easy change for them to make. So they did, and the Air Jordan 1 was born. What happened over the next few years would change the direction of Nike and sneaker culture forever.",
    price: 12
}, (err, thingk) => {
    if (err) {
        console.log("Error creating thingk " + err);
    } else {
        Comment.create({
            username: "Dan",
            text: "Generic comment coming through!"
        }, (err, comment) => {
            if (err) {
                console.log("Error creating comment");
            } else {
                thingk.comments.push(comment);
                thingk.save();
                console.log(thingk);
            }
        });
    }
});

//Catch-all Route
app.get("*", (req, res) => {
    res.send("PAGE NOT FOUND... WHAT ARE YOU DOING WITH YOUR LIFE!");
});

//Listening to routes on local server
app.listen(port, () => console.log("SERVER STARTED ON PORT: " + port));