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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Configuring body-parser
app.use(bodyParser.urlencoded({extended: true}));


/*~~~ ROUTES ~~~*/

// Root route
app.get('/', (req, res) => {
  res.render('home');
});

// Secret route
app.get('/secret', (req, res) => {
  res.render('secret');
});

/*~~~ AUTH ROUTES ~~~*/

// Show sign-up form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handling user sign-up
app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.register(new User({username: username}), password, (err, createdUser) => {
    if(err) {
      console.log('Error! ' + err);
      return res.render('register'); // short circuits the proceeding logic
    } 
    // Logs user in and redirects to secret page
    passport.authenticate('local')(req, res, function(){
      res.redirect('/secret');
    });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, function() {
  console.log('Server started on PORT ' + PORT);
});