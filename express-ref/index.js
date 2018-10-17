const express = require("express");
const app = express();
const ca = require("chalk-animation");
const basicAuth = require("basic-auth");
app.use(require("cookie-parser")());
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);
var auth = function(req, res, next) {
    var creds = basicAuth(req);
    if (!creds || creds.name != "discoduck" || creds.pass != "opensesame") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

/////////////////////////////////////////////////////////////
/////////////// DEALING WITH POST ROUTES ////////////////////
/////////////////////////////////////////////////////////////

app.get("/animal-input", (req, res) => {
    res.send(
        `
            <h1>Enter a new cute animal!</h1>
            <form method = "POST" action = '/animal-input'>
                <input name = 'animal' placeholder = 'animal'>
                <input name = 'cuteness' placeholder = 'cuteness'>
                <button type = 'submit'>submit!</button>
            </form>
        `
    );
});

app.post("/animal-input", (req, res) => {
    console.log("this is my req body! ", req.body);
    // here we would normally do something with the user's input,
    // like store in db or cookie
    res.send(req.body);
});

//Serving the html file in the public folder
app.use(express.static("public"));
let cuteAnimals = [
    {
        name: "otter",
        cuteness: 12
    },

    {
        name: "rabbits",
        cuteness: 8
    },
    {
        name: "hamster",
        cuteness: 7
    },
    {
        name: "puppies",
        cuteness: 9
    },
    {
        name: "whale",
        cuteness: 10
    },
    {
        name: "meerkat",
        cuteness: "adorable"
    }
];

/////////////////////////////////////////////////////////////
///////////// END DEALING WITH POST ROUTES //////////////////
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////
///////////////// DEALING WITH COOKIES //////////////////////
/////////////////////////////////////////////////////////////

app.get("/animals/fave-animal/:faveAnimal", (req, res) => {
    // put something in a cookie
    res.cookie("favoriteAnimal", req.params.faveAnimal);
    res.redirect("/read-cookie");
});

app.get("/read-cookie", (req, res) => {
    // read the cookie with req.cookies
    res.send(`Your favorite animal is ${req.cookies.favoriteAnimal}`);
});
//can use this to write a Middleware and chekc if certain cookies are present and redirect accordingly

/////////////////////////////////////////////////////////////
/////////////// END DEALING WITH COOKIES ////////////////////
/////////////////////////////////////////////////////////////

//********************************Intro to Express

//***********************Routing in Express
app.get("/hello", (req, res) => {
    //tells the server that if a get request to /hello comes, do this thing
    ca.rainbow("HEEEEEELOOOOOO!");
    // res.send("HI, Express is awesome!");
    //can also send a FILE as a response
    res.sendFile(__dirname + "/index2.html");
});

app.get("/animals", (req, res) => {
    console.log("cute animals :DD");
    let html = "";
    for (let i = 0; i < cuteAnimals.length; i++) {
        html += "<p>" + cuteAnimals[i].name + "</p>";
    }
    res.send(html);
});

//****************************Middleware
app.use((req, res, next) => {
    // fucntion that runs everytime beore server is hit with a url
    //for some reason req params is empty
    console.log(req.url);
    let counter = 0;
    for (let i = 0; i < cuteAnimals.length; i++) {
        //checking if enterng valid animal
        if (`/animals/${cuteAnimals[i].name}` == req.url) {
            next(); //the user is good to go, the server can now go on and read the next code block in the file
            counter++;
        }
        // if user enters invalid input redirect them to the animals page
        if (counter == 0) {
            res.redirect("/animals");
        }
    }
    res.send(html);
});

app.get("/animals/:someAnimal", (req, res) => {
    //the colon is a placeholer for something we can't predict yet
    //reading what the user puts after the second slash, can do that with the params feature that req objects have in Express
    ca.rainbow(req.params.someAnimal);
    let html = "";
    for (let i = 0; i < cuteAnimals.length; i++) {
        if (req.params.someAnimal == cuteAnimals[i].name) {
            html += `${req.params.someAnimal} is the cuteness score :D ${
                cuteAnimals[i].cuteness
            } AWWWWWWWWWW! `;
        }
    }
    if (html.legth == 0) {
        html += "You've entered something incorectly sozz boii";
    }
    res.send(html);
});

//****************************Redirecting Users

app.use(function(req, res, next) {
    res.redirect("/animals");
});

//this is a server in express
app.listen(8080, () => ca.rainbow("Listening :D"));
