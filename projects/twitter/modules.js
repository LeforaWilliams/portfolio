const https = require("https");
const { consumerKey, consumerSecret } = require("./secrets.json");

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

        //another chunk of data has been recieved, so append it to `str`
        response.on("data", function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on("end", function() {
            let strParse = JSON.parse(str);
            cb(null, strParse);

            // console.log("KEW GARDEN TEXT: ", tText);
        });
    };

    https.request(options, callback).end();
};

//FUnction that takes all the tweets and should not run until getTweets is finished running

module.exports.filterTweets = function filterTweets(tweets) {
    let filterArray = [];
    for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].entities.urls.length > 0) {
            let tweetIndex = tweets[i].text.indexOf("https");
            let headline =
                tweets[i].text.slice(0, tweetIndex) +
                "(" +
                tweets[i].user.name +
                ")";
            let url = tweets[i].entities.urls[0].url;
            filterArray.push({ text: headline, href: url });
        }
    }
    return filterArray;
};

//have to pass get tweets 3 screen names
//promisify getTweets, get token
//get tweets from more than one source and wrap it in a Promise.all FUnction
// before filtering join them into one array with the spread operator
// also sort them by timestamp (created-at)
//>

// console.log(
//     c.sort(function(a, b) {
//         return b - a;
//     })
// );
//
// tweets.sort(function(a, b) {
//     return new Date(b.created_at) - new Date(a.created_at);
// });
