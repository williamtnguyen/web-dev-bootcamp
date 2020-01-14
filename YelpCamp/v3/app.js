const express     = require('express'), 
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'), 
      Campground  = require('./models/campground');
      seedDB      = require('./seeds');
     

// Connecting mongoose (makes DB if it DNE)
mongoose.connect('mongodb://localhost/yelp_camp_v3');
// Setting default view engine
app.set('view engine', 'ejs');
// Allows us to get input from form
app.use(bodyParser.urlencoded({extended: true}));
// Seed the DB
seedDB();


/* ROUTES */
app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX = Show all campgrounds
app.get('/campgrounds', (req, res) => {
  // Get all campgrounds from DB rather than a defined array
  Campground.find({}, (err, allCampgrounds) => {
    if(err) {
      console.log("error: " + err);
    } else {
      res.render('index', {campGrounds: allCampgrounds});
    }
  });
});

// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
  // Get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err) {
      console.log(err);
    } else {
      // Redirect back to campgrounds page
      res.redirect('/campgrounds');    
    }
  });
});

// NEW - Show form to create new campground
// RESTful convention: renders the form that sends data to POST route
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

// SHOW - Shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  // Find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if(err) {
      console.log("Error: " + err);
    } else {
      console.log(foundCampground);
      // Render show template with foundCampground
      res.render('show', {campground: foundCampground});
    }
  });  
});

// Start server
var port = 3000;
app.listen(port, function() {
  console.log("Server has started on " + port);
});