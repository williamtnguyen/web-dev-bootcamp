var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Setting default view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Global campgrounds array
var campgrounds = [
  {name: "Salmon Creek", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.png"},
  {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.jpg"},
  {name: "Mountain's Goat's Rest", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.jpg"},
  {name: "Salmon Creek", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.png"},
  {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.jpg"},
  {name: "Mountain's Goat's Rest", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.jpg"},
  {name: "Salmon Creek", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.png"},
  {name: "Granite Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.jpg"},
  {name: "Mountain's Goat's Rest", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72277fd19044c45c_340.jpg"}
];

/* ROUTES */
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  // Syntax: pseudoElement name: varname above
  res.render('campgrounds', {campGrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
  // Get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);

  // Redirect back to campgrounds page
  res.redirect('/campgrounds');
});

// RESTful convention: form that sends data to POST route
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

// Start server
var port = 3000;
app.listen(port, function() {
  console.log("Server has started on " + port);
});