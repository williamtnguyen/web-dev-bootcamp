var express = require("express");
var app = express();

// Landing page
app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

// Speak route
app.get("/speak/:animal", function(req, res) {
  var sounds = {
    pig: "Oink",
    cow: "Moo", 
    dog: "Woof Woof!",
    cat: "I hate you human",
    goldfish: "....."
  };

  var animal = req.params.animal.toLowerCase();
  var sound = sounds[animal]; 
  res.send("The " + animal + " says '" + sound + "'");
});

// Repeat route
app.get("/repeat/:word/:numOfRepeats", function(req, res) {
  var message = "";
  var word = req.params.word;
  var numOfRepeats = Number(req.params.numOfRepeats);
  for(var i = 0; i < numOfRepeats; i++) {
    message += word;
    message += " ";
  }
  res.send(message);
});

// Fallback route
app.get("*", function(req, res) {
  res.send("Sorry, page not found...What are you doing with your life?");
});


// Tell Express to listen for requests (start server)
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Has Started!");
});