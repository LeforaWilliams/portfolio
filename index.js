const express = require("express");
const app = express();
const ca = require("chalk-animation");
const basicAuth = require("basic-auth");
const hb = require("express-handlebars");
const fs = require("fs");
app.use(require("cookie-parser")());
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

//**** TEMPLATES WITH EXPRESS HANDLEBARS
let folders = fs.readdirSync(__dirname + "/projects"); //turn this into an array of objects and add the json file information into it

let foldersObj = folders.map(folder => {
    const { name, description, className, technologies } = require(__dirname +
        "/projects/" +
        folder +
        "/info.json");
    return {
        folder,
        name,
        description,
        className,
        technologies
    };
});

//HOME
app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("home", {
        layout: "main",
        foldersObj
    });
});

app.get("/projects", function(req, res) {
    const image = "/projects/" + req.params.projectName + "/screenshot.png"; //where is the project name specified ?
    res.render("home", {
        layout: "main",
        foldersObj,
        image
    });
});
app.get("/projects/:projectName/description", function(req, res) {
    //loop that compares the name variable to the array of objects to see if the file exists
    const name = req.params.projectName;
    const image = "/" + req.params.projectName + "/screenshot.png";
    let fullProj = "/" + name;

    if (name == "socialnetwork") {
        fullProj = "https://people-network.herokuapp.com/";
    }

    if (name == "petition") {
        fullProj = "https://ethical-fashion-petition.herokuapp.com/";
    }

    if (name == "imageboard") {
        //to come :))
    }

    if (folders.includes(name)) {
        const jsonInfo = require(__dirname +
            "/projects/" +
            name +
            "/info.json");

        res.render("description", {
            layout: "main",
            json: jsonInfo,
            image,
            fullProj,
            foldersObj
        });
    } else {
        res.redirect("/projects");
    }
    app.get("/", function(req, res) {
        res.redirect("/projects");
    });
});

//Contact
app.get("/contact", (req, res) => {
    res.render("contact", {
        layout: "main"
    });
});

app.listen(process.env.PORT || 8080, () => console.log("Listening :DD"));
