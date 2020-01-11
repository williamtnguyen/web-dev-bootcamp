var express = require("express");
var app = express();

// ROUTES: 

// "/" => "Hi there!"
app.get("/", function(req, res) {
  res.send("Hi there!");
});
// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
	res.send("Goodbye!");
});
// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
	res.send("MEOW!");
});

// ROUTE PARAMETERS:

// ":" Route parameter, match anything "/r/anything"
app.get("/r/:subredditName", function(req, res) {
	var subredditName = req.params.subredditName;
	res.send("Welcome to the " + subredditName.toUpperCase() + " SUBREDDIT");
});
app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
	res.send("Welcome to the comments section");
});



// Whenever a get request for any url that isn't defined
app.get("*", function(req, res) {
	res.send("YOU ARE A STAR!");
});


// Tell Express to listen for requests (start server)
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});