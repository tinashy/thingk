let mongoose = require("mongoose"),
    Thingk = require("./models/thingk"),
    Comment = require("./models/comment");

let data = [{
        name: "Air Jordan 1 Collabs",
        image: "https://c.static-nike.com/a/images/w_1920,c_limit,f_auto/dkdrhmnqjyfrhjr0qv4y/air-jordan-i-mid-fearless-melody-ehsani-release-date.jpg",
        desc: "Designed by Peter Moore, the Jordan 1 originally released from 1985 to 1986. Quite a few colorways of the model were produced, as well as a few different variations. Following its initial run in the 80s, the Jordan 1 jumpstarted the retro era in 1994, following Jordan's retirement from basketball. The shoe returned again in 2001, including the introduction of a Jumpman branded mid-top. It wasn't until 2008 that Jordan Brand started re-releasing the Jordan 1 with its original high cut. Since then, the Jordan 1 High has had a relatively consistent presence in the market, as it 's been featured in the 22/1 Collezione ‘Countdown’ Pack. the Doernbecher freestyle series and commemorated Jordan's Hall of Fame induction in 2009. In recent years, the shoe has enjoyed a heightened level of popularity behind the retro of the canvas - based Air Jordan 1 KO, Nike SB collaborations and the highly anticipated return ofOG 'Nike Air' branding.Jordan Brand has also been packaging the Jordan 1 in a retro box - inspired by the original 1985 design.",
        price: 12
    },
    {
        name: "Air Jordan 1 Collabs",
        image: "https://c.static-nike.com/a/images/w_1920,c_limit,f_auto/dkdrhmnqjyfrhjr0qv4y/air-jordan-i-mid-fearless-melody-ehsani-release-date.jpg",
        desc: "Designed by Peter Moore, the Jordan 1 originally released from 1985 to 1986. Quite a few colorways of the model were produced, as well as a few different variations. Following its initial run in the 80s, the Jordan 1 jumpstarted the retro era in 1994, following Jordan's retirement from basketball. The shoe returned again in 2001, including the introduction of a Jumpman branded mid-top. It wasn't until 2008 that Jordan Brand started re-releasing the Jordan 1 with its original high cut. Since then, the Jordan 1 High has had a relatively consistent presence in the market, as it 's been featured in the 22/1 Collezione ‘Countdown’ Pack. the Doernbecher freestyle series and commemorated Jordan's Hall of Fame induction in 2009. In recent years, the shoe has enjoyed a heightened level of popularity behind the retro of the canvas - based Air Jordan 1 KO, Nike SB collaborations and the highly anticipated return ofOG 'Nike Air' branding.Jordan Brand has also been packaging the Jordan 1 in a retro box - inspired by the original 1985 design.",
        price: 12
    },
    {
        name: "Air Jordan 1 Collabs",
        image: "https://c.static-nike.com/a/images/w_1920,c_limit,f_auto/dkdrhmnqjyfrhjr0qv4y/air-jordan-i-mid-fearless-melody-ehsani-release-date.jpg",
        desc: "Designed by Peter Moore, the Jordan 1 originally released from 1985 to 1986. Quite a few colorways of the model were produced, as well as a few different variations. Following its initial run in the 80s, the Jordan 1 jumpstarted the retro era in 1994, following Jordan's retirement from basketball. The shoe returned again in 2001, including the introduction of a Jumpman branded mid-top. It wasn't until 2008 that Jordan Brand started re-releasing the Jordan 1 with its original high cut. Since then, the Jordan 1 High has had a relatively consistent presence in the market, as it 's been featured in the 22/1 Collezione ‘Countdown’ Pack. the Doernbecher freestyle series and commemorated Jordan's Hall of Fame induction in 2009. In recent years, the shoe has enjoyed a heightened level of popularity behind the retro of the canvas - based Air Jordan 1 KO, Nike SB collaborations and the highly anticipated return ofOG 'Nike Air' branding.Jordan Brand has also been packaging the Jordan 1 in a retro box - inspired by the original 1985 design.",
        price: 12
    },
];

function seedDB() {
    Thingk.find({}, (err, thingks) => {
        if (err) {
            console.log("Error finding thingks in the database :" + err);
        } else {
            data.forEach((thingk) => {
                Thingk.create(thingk, (err, createdThingk) => {
                    if (err) {
                        console.log("Error creating thingk");
                    } else {
                        Comment.create({
                            username: "Dan",
                            text: "Generic comment coming through!.. :("
                        }, (err, comment) => {
                            if (err) {
                                console.log("Error creating comment to attach to thingk" + err);
                            } else {
                                createdThingk.comments.push(comment);
                                createdThingk.save();
                                console.log(createdThingk);
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;