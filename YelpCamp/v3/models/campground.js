const mongoose = require('mongoose');

// Campground schema/model setup
var campgroundSchema = new mongoose.Schema({
  name: String, 
  image: String,
  description: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// Compiling a model
var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;