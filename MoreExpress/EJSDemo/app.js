var express = require("express");
var app = express();

// Tells express to serve the contents from the "public" directory (where css, js, etc. goes)
app.use(express.static("public"));
// Tells express that we're going to use ejs files, shortening our code
app.set("view engine", "ejs");

// Root route
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
  var thing = req.params.thing;
  res.render("love", {thingVar: thing});
}); 

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post 1", author: "Susy"},
    {title: "Post 2", author: "William"},
    {title: "Post 3", author: "Joe"}
  ];
  // Syntax: {var defined in route: pseudoelement in ejs markup/template}
  res.render("posts", {posts: posts})
});

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server has started!");
});