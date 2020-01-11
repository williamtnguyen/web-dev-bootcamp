var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Need this line to be able to take input from html
app.use(bodyParser.urlencoded({extended: true}));
// Set default view engine
app.set("view engine", "ejs");
// Global friends array
var friends = ["Tony", "Pierre", "Miranda", "Justin", "Willy"];


// Root route
app.get("/", function(req, res) {
  res.render("home");
});

// Adding a new friend li
app.post("/addFriend", function(req, res) {
  var newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect("/friends"); // triggers "/friends" route again
});

// Load all friends in friends array onto page template
app.get("/friends", function(req, res) {
  // Syntax: {EJS markup: var name defined above}
  res.render("friends", {themFriends: friends});
});


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server has started!");
});