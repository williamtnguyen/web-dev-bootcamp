const express               = require('express'),
      app                   = express(),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      User                  = require('./models/user'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose');

// Connecting to mongoDB
mongoose.connect('mongodb://localhost/auth_demo_app');

// Setting default view engine
app.set('view engine', 'ejs');
// Setting up express-session
app.use(require('express-session')({
  secret: "Alex Caruso is the GOAT",
  resave: false,
  saveUninitialized: false
}));
// Setting up Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Configuring body-parser to get data from sign-up form
app.use(bodyParser.urlencoded({extended: true}));


/*~~~ ROUTES ~~~*/

// Root route
app.get('/', (req, res) => {
  res.render('home');
});

// Secret route: only accessible if user is logged in
app.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret');
});

/*~~~ AUTH ROUTES ~~~*/

// REGISTRATION ROUTES
// Show sign-up form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handling user sign-up
app.post('/register', (req, res) => {
  var username = req.body.username,
      password = req.body.password;
  // Save new user to database, with a hashed password
  User.register(new User({username: username}), password, (err, createdUser) => {
    if(err) {
      console.log('Error! ' + err);
      return res.render('register'); // short circuits the proceeding logic
    } 
    // Logs user in (with local strategy) and redirects to secret page
    passport.authenticate('local')(req, res, function(){
      res.redirect('/secret');
    });
  });
});

// LOGIN ROUTES
// Render login form
app.get('/login', (req, res) => {
  res.render('login');
});

// Handling user login logic
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), (req, res) => {
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(); // Destroys all user data in the session
  res.redirect('/');
});


// Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next(); // render secret page
  }
  res.redirect('login');
}


// Start server
const PORT = 3000;
app.listen(PORT, function() {
  console.log('Server started on PORT ' + PORT);
});