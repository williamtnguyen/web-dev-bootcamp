var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');

var Post = require('./models/post');
var User = require('./models/user')

// User.create({
//   email: 'williamnguyen214@gmail.com',
//   name: 'William Nguyen'
// });

Post.create({
  title: 'How to cook the best burger pt. 4',
  content: 'SHlime shit'
}, (err, post) => {
  User.findOne({email: 'williamnguyen214@gmail.com'}, (err, foundUser) => {
    // Schema definition will push 'post' Object ID
    foundUser.posts.push(post);
    foundUser.save((err, userData) => {
      if(err) {
        console.log('Error: ' + err);
      } else {
        console.log(userData);
      }
    })
  });
});

// // Find user
// // Find all posts from that user
// User.findOne({email: 'williamnguyen214@gmail.com'}).populate('posts').exec((err, user) => {
//   if(err) {
//     console.log('error! ' + err);
//   } else {
//     console.log(user);
//   }
// });