var mongoose = require("mongoose");
var db = require("../models");

var axios = require("axios");



module.exports = function (app) {

    app.get("/api/articles", function(req, res) 
    {
      //get all of them
      db.Article.find({})
        .then(function(articledb) 
        {
          //respond with successful retrieval
          res.json(articledb);
          console.log(articledb + "hello");
        })
        .catch(function(err) 
        {
          //catch to handle error situation
          res.json(err);
      });
    });

    app.get("/api/comments", function(req, res) 
    {
      //get all of them
      db.Comments.find({})
        .then(function(commentsdb) 
        {
          //respond with successful retrieval
          res.json(commentsdb);
          console.log(commentsdb + "comments");
        })
        .catch(function(err) 
        {
          //catch to handle error situation
          res.json(err);
      });
    });


    app.post("/api/comments", function (req, res) {
      db.Comments.create({
        userName: req.body.userName,
        comment: req.body.comment
      }, function (err, CommentSchema) {
        if (err) return handleError(err);
        // saved!
      });
       
    });



};





