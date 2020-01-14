const mongoose = require('mongoose');

// USER MODEL - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [
    {
      // Mongoose object ID belonging to some post
      // Since its defined by ID in the schema, just push 'post' and it will add the ID
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

var User = mongoose.model("User", userSchema);
module.exports = User;