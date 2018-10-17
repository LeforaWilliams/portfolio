const express = require("express");
const app = express();
const ca = require("chalk-animation");
const { getBearerToken, getTweets, filterTweets } = require("./modulesRef");
const https = require("https");
const { promisify } = require("util");
let getBearerTokenP = promisify(getBearerToken);
let getTweetsP = promisify(getTweets);

app.use(express.static("public")); // looking for all files in this folder
app.get("/info.json", (req, res) => {
    getBearerTokenP()
        .then(function(token) {
            return Promise.all([
                getTweetsP(token, "kewgardens"),
                getTweetsP(token, "theonion"),
                getTweetsP(token, "nytimes")
            ]);
        })
        .then(function([kew, onion, nyTimes]) {
            let tweets = [...kew, ...onion, ...nyTimes];
            tweets.sort(function(a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            });

            res.json(filterTweets(tweets));
        })
        .catch(function(err) {
            console.log(err);
        });
});

app.listen(8080, () => ca.rainbow("Listening :DD"));
