const bodyParser        = require('body-parser'),
      methodOverride    = require('method-override'),
      expressSanitizer  = require('express-sanitizer');
      mongoose          = require('mongoose'),
      express           = require('express'),
      app               = express();

// Connecting to MongoDB
mongoose.connect('mongodb://localhost/restful_blog_app');
// Setting default view engine
app.set("view engine", "ejs");
// Telling Express to serve contents from public directory
app.use(express.static("public"));
// Allows us to get data from forms
app.use(bodyParser.urlencoded({extended: true}));
// Allows us to make PUT and DELETE requests from HTML form
app.use(methodOverride("_method"));
// Prevents users from adding script tags to blog.body
app.use(expressSanitizer());

// Mongoose model configuration
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);


/* RESFTUL ROUTES */

// Root route (redirects to INDEX)
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// INDEX route
app.get('/blogs', (req, res) => {
  var blogs = Blog.find({}, (err, allBlogs) => {
    if(err) {
      console.log("Error " + err);
    } else {
      res.render('index', {blogs: allBlogs});
    }
  });
});

// NEW route (get request, displays form)
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

// CREATE route (post request, then displays new blog)
app.post('/blogs', (req, res) => {
  // Sanitizing body of potential script tags
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // Create blog
  var data = req.body.blog;
  Blog.create(data, (err, newBlog) => {
    if(err) {
      res.render('new');
    } else {
      // Redirect to index route
      res.redirect('/blogs');
    }
  });
});

// SHOW route
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});

// EDIT route
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });
});

// UPDATE route
app.put('/blogs/:id', (req, res) => {
  // Sanitizing body of potential script tags
  req.body.blog.body = req.sanitize(req.body.blog.body);
  
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + updatedBlog._id);
    }
  });
});

// DELETE route
app.delete('/blogs/:id', (req, res) => {
  // Destroy blog
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
  // Redirect to index route
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});