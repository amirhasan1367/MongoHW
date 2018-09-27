// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");

var mongoose = require("mongoose");

var db = require("../models");

// First, tell the console what server.js is doing

var scrape = function () {

  // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
  request("https://www.foxbusiness.com/category/technology", function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("div.info").each(function (i, element) {

      // Save the text of the element in a "title" variable
      var titleS = $(element).text();


      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      var link = $($(this).children("h3")).children("a").attr("href");


      var summary = $($(this)).children("p").text();

      db.Article.find({ title: titleS});


      db.Article.findOne({title: titleS}, function (err, result) {
        if (err) {console.log(err)}
        if (!result) {
           console.log("title not found");
           db.Article.create({
            title: titleS,
            link: link,
            summary: summary
          }, function (err, ArticleSchema) {
            if (err) return handleError(err);
            // saved!
          });
        }
        else {
          
          console.log("title found");
        }
    });

      results.push({
        title: titleS,
        link: link,
        summary: summary
      });

    
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
    console.log(results.length);

  });

};

module.exports = scrape;