var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

// POST MODEL - title, content
var postSchema = new mongoose.Schema({
  title: String, 
  content: String
});

var Post = mongoose.model("Post", postSchema); 


// USER MODEL - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//   email: 'hermione@hogwarts.edu',
//   name: 'Hermione Granger'
// });

// newUser.posts.push({
//   title: "How to brew polyjuice potion",
//   content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save((err, user) => {
//   if(err) {
//     console.log("Error!: " + err);
//   } else {
//     console.log(user);
//   }
// });

// var newPost = new Post({
//   title: "Reflections on Apples",
//   content: "They are delicious"
// });

// newPost.save((err, post) => {
//   if(err) {
//     console.log('Error! ' + err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({name: "Hermione Granger"}, (err, user) => {
  if(err) {
    console.log('Error! ' + err);
  } else {
    user.posts.push({
      title: '3 things i rlly hate bruv',
      content: 'u, u, u'
    });
    user.save((err, post) => {
      if(err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});