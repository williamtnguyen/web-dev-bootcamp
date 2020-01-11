const bodyParser  = require('body-parser'),
      express     = require('express'),
      mongoose    = require('mongoose'),
      app         = express();

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/restful_blog_app');
// Setting default view engine
app.set("view engine", "ejs");
// Telling Express to serve contents from public directory
app.use(express.static("public"));
// Allows us to get data from forms
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose model configuration
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);


// RESFTUL ROUTES

// Root route
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// Index route
app.get('/blogs', (req, res) => {
  var blogs = Blog.find({}, (err, allBlogs) => {
    if(err) {
      console.log("Error " + err);
    } else {
      res.render('index', {blogs: allBlogs});
    }
  });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});