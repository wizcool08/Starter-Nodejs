const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

// require registerPartials to enable the use of partials from the views folder
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("ERROR:Unable to append to server.log.");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

//express.static takes the absolute path that you want to serve out e.g./help.html
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("Capitalize", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  // res.send("<h1>Hello Worldddd!</h1>");
  res.render("home.hbs", {
    pageTitle: "Welcome Page",
    welcomeMessage: "this is a welcome page!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page lehh!"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request!:("
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
