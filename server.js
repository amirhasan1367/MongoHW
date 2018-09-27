var scrape = require("./script/scrape.js");
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");


var Articles = require("./models/articles");
var Comments = require("./models/comments");


var db = process.env.MONGODB_URI || "mongodb://localhost/articlesdb";

var app = express();

var PORT = 3000;



mongoose.connect(db, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;

scrape();

