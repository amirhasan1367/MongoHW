var mongoose = require("mongoose");
var Schema = mongoose.Schema;




var CommentSchema = mongoose.Schema({
    userName: String,
    comment: String
    
});

var Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;