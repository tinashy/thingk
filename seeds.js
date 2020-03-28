let mongoose = require("mongoose"),
    Thingk = require("./models/thingk"),
    Comment = require("./models/comment");

let data = [{
        name: "Air Jordan 1 Collabs",
        image: "https://ae01.alicdn.com/kf/H3dfe3548c81844e59c971952e576b900z.jpg?width=800&height=800&hash=1600",
        desc: "Designed by Peter Moore, the Jordan 1 originally released from 1985 to 1986. Quite a few colorways of the model were produced, as well as a few different variations. Following its initial run in the 80s, the Jordan 1 jumpstarted the retro era in 1994, following Jordan's retirement from basketball. The shoe returned again in 2001, including the introduction of a Jumpman branded mid-top. It wasn't until 2008 that Jordan Brand started re-releasing the Jordan 1 with its original high cut. Since then, the Jordan 1 High has had a relatively consistent presence in the market, as it 's been featured in the 22/1 Collezione ‘Countdown’ Pack. the Doernbecher freestyle series and commemorated Jordan's Hall of Fame induction in 2009. In recent years, the shoe has enjoyed a heightened level of popularity behind the retro of the canvas - based Air Jordan 1 KO, Nike SB collaborations and the highly anticipated return ofOG 'Nike Air' branding.Jordan Brand has also been packaging the Jordan 1 in a retro box - inspired by the original 1985 design.",
        price: 120,
        externalUrl: "https://www.aliexpress.com/item/4000324169154.html?spm=a2g0o.detail.1000014.9.4b117368vFrVpQ&gps-id=pcDetailBottomMoreOtherSeller&scm=1007.13338.128125.0&scm_id=1007.13338.128125.0&scm-url=1007.13338.128125.0&pvid=d0e51e35-4d4d-4fca-8472-d669648045e2",
    },
    {
        name: "Air Jordan 1 Collabs",
        image: "https://ae01.alicdn.com/kf/H3dfe3548c81844e59c971952e576b900z.jpg?width=800&height=800&hash=1600",
        desc: "Designed by Peter Moore, the Jordan 1 originally released from 1985 to 1986. Quite a few colorways of the model were produced, as well as a few different variations. Following its initial run in the 80s, the Jordan 1 jumpstarted the retro era in 1994, following Jordan's retirement from basketball. The shoe returned again in 2001, including the introduction of a Jumpman branded mid-top. It wasn't until 2008 that Jordan Brand started re-releasing the Jordan 1 with its original high cut. Since then, the Jordan 1 High has had a relatively consistent presence in the market, as it 's been featured in the 22/1 Collezione ‘Countdown’ Pack. the Doernbecher freestyle series and commemorated Jordan's Hall of Fame induction in 2009. In recent years, the shoe has enjoyed a heightened level of popularity behind the retro of the canvas - based Air Jordan 1 KO, Nike SB collaborations and the highly anticipated return ofOG 'Nike Air' branding.Jordan Brand has also been packaging the Jordan 1 in a retro box - inspired by the original 1985 design.",
        price: 120,
        externalUrl: "https://www.aliexpress.com/item/4000324169154.html?spm=a2g0o.detail.1000014.9.4b117368vFrVpQ&gps-id=pcDetailBottomMoreOtherSeller&scm=1007.13338.128125.0&scm_id=1007.13338.128125.0&scm-url=1007.13338.128125.0&pvid=d0e51e35-4d4d-4fca-8472-d669648045e2",
    },
    {
        name: "Air Jordan 1 Collabs",
        image: "https://ae01.alicdn.com/kf/H3dfe3548c81844e59c971952e576b900z.jpg?width=800&height=800&hash=1600",
        desc: "Designed by Peter Moore, the Jordan 1 originally released from 1985 to 1986. Quite a few colorways of the model were produced, as well as a few different variations. Following its initial run in the 80s, the Jordan 1 jumpstarted the retro era in 1994, following Jordan's retirement from basketball. The shoe returned again in 2001, including the introduction of a Jumpman branded mid-top. It wasn't until 2008 that Jordan Brand started re-releasing the Jordan 1 with its original high cut. Since then, the Jordan 1 High has had a relatively consistent presence in the market, as it 's been featured in the 22/1 Collezione ‘Countdown’ Pack. the Doernbecher freestyle series and commemorated Jordan's Hall of Fame induction in 2009. In recent years, the shoe has enjoyed a heightened level of popularity behind the retro of the canvas - based Air Jordan 1 KO, Nike SB collaborations and the highly anticipated return ofOG 'Nike Air' branding.Jordan Brand has also been packaging the Jordan 1 in a retro box - inspired by the original 1985 design.",
        price: 120,
        externalUrl: "https://www.aliexpress.com/item/4000324169154.html?spm=a2g0o.detail.1000014.9.4b117368vFrVpQ&gps-id=pcDetailBottomMoreOtherSeller&scm=1007.13338.128125.0&scm_id=1007.13338.128125.0&scm-url=1007.13338.128125.0&pvid=d0e51e35-4d4d-4fca-8472-d669648045e2"
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