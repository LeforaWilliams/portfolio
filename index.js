const express = require("express");
const app = express();
const ca = require("chalk-animation");
const hb = require("express-handlebars");
const fs = require("fs");
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./style"));

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
    let fullProj;

    if (name == "1socialnetwork") {
        console.log("A");
        fullProj = "https://people-network.herokuapp.com/";
    } else if (name == "2petition") {
        fullProj = "https://ethical-fashion-petition.herokuapp.com/";
    } else if (name == "3imageboard") {
        //to come :))
    } else {
        fullProj = "/" + name;
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
