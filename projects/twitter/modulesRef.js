const https = require("https");
const { consumerKey, consumerSecret } = require("./secrets.json");
// const { promisify } = require("util");
//
// let getBearerTokenP = promisify(getBearerToken);
// let getTweetsP = promisify(getTweets);

module.exports.getBearerToken = function getBearerToken(cb) {
    let concatString = `${consumerKey}:${consumerSecret}`;
    let base64Encoded = new Buffer(concatString).toString("base64");

    var options = {
        host: "api.twitter.com",
        path: "/oauth2/token",

        headers: {
            Authorization: `Basic ${base64Encoded}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8."
        },

        method: "POST"
    };

    let callback = function(response) {
        if (response.statusCode != 200) {
            cb(new Error(response.statusCode));
            return;
        }
        var str = "";
        response.on("data", function(chunk) {
            str += chunk;
        });

        response.on("end", function() {
            // console.log("STRING: >>> ", str);
            let token = JSON.parse(str).access_token;
            // console.log("TOKEN>>>>> ", token);
            cb(null, token);
        });
    };

    var req = https.request(options, callback);

    req.write("grant_type=client_credentials");
    req.end();
};

module.exports.getTweets = function getTweets(bToken, screenName, cb) {
    var options = {
        host: "api.twitter.com",
        path: "/1.1/statuses/user_timeline.json?screen_name=" + screenName,
        headers: {
            Authorization: `Bearer ${bToken}`
        },
        method: "GET"
    };

    let callback = function(response) {
        var str = "";

        response.on("data", function(chunk) {
            str += chunk;
        });

        response.on("end", function() {
            let strParse = JSON.parse(str);
            cb(null, strParse);
        });
    };

    https.request(options, callback).end();
};

module.exports.filterTweets = function filterTweets(tweets) {
    let tweetArray = tweets
        .filter(tweet => tweet.entities.urls.length == 1)
        .map(tweet => {
            if (tweet.entities.urls.length > 0) {
                let tweetIndex = tweet.text.indexOf("https");

                return {
                    text:
                        tweet.text.slice(0, tweetIndex) +
                        "(" +
                        tweet.user.name +
                        ")",
                    href: tweet.entities.urls[0].url
                };
            }
        });
    return tweetArray;
};
