const express     = require('express'), 
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'), 
      Campground  = require('./models/campground'),
      Comment     = require('./models/comment'),
      seedDB      = require('./seeds');
     

// Connecting mongoose (makes DB if it DNE)
mongoose.connect('mongodb://localhost/yelp_camp_v3');
// Setting default view engine
app.set('view engine', 'ejs');
// Allows us to get input from form
app.use(bodyParser.urlencoded({extended: true}));
// Serve the public directory (CSS and JS)
app.use(express.static(__dirname + '/public'));
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
      res.render('campgrounds/index', {campGrounds: allCampgrounds});
    }
  });
});

// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
  // Get data from form to add to campgrounds collection in DB
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
  res.render('campgrounds/new');
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
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });  
});

/* ---------------- */
/* COMMENTS ROUTES */
/* ---------------- */

// NEW - Show form to create new comment on campgrounds page
// RESTful convention: renders the form that sends data to POST route
app.get('/campgrounds/:id/comments/new', (req, res) => {
  // Find campground by ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log('Error! ' + err);
    } else {
      // Render the form
      res.render('comments/new', {campground: foundCampground});
    }
  });
});

// CREATE - add new comment to unique campground in DB
app.post('/campgrounds/:id/comments', (req, res) => {
  // Lookup campground using ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if(err) {
      console.log('Error! ' + err);
      res.redirect('/campgrounds');
    } else {
      // Create new comment
      Comment.create(req.body.comment, (err, newComment) => {
        if(err) {
          console.log('Error! ' + err);
        } else {
          // Connect new comment to campground
          foundCampground.comments.push(newComment);
          foundCampground.save();
          // Redirect to campground show page
          res.redirect('/campgrounds/' + foundCampground._id);
        }
      });
    }
  });
});


// Start server
var PORT = 3000;
app.listen(PORT, function() {
  console.log("Server has started on " + port);
});