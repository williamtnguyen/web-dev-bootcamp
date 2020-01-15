const mongoose = require('mongoose');

// Comment Schema/Model
var commentSchema = mongoose.Schema({
  text: String,
  author: String
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;