const express = require("express");
const app = express();
const ca = require("chalk-animation");
const { getBearerToken } = require("./modules");
const { getTweets } = require("./modules");
const { filterTweets } = require("./modules");
const https = require("https");

app.use(express.static("public")); // looking for all files in this folder
app.get("/info.json", (req, res) => {
    // this route will be the route the ajax makes requests to

    //callback that make sure that getTweets is called where we specified it in the getBearerToken function
    getBearerToken(function(err, bearerToken) {
        if (err) {
            console.log("ERROR IN getBearerToken", err);
            return;
        }
        getTweets(bearerToken, function(err, tweets) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(
                "TWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEETS",
                tweets
            );

            res.json(filterTweets(tweets)); //returns an array of objects, this array will be sent to the ticker
        });
    });
});

app.listen(8080, () => ca.rainbow("Listening :DD"));
