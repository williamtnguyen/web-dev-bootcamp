const mongoose    = require('mongoose');
      Campground  = require('./models/campground');
      Comment     = require('./models/comment');


var data = [
  {
    name: "Cloud's Rest", 
    image: "https://images.unsplash.com/photo-1578946841286-ab4940e38339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Slatt bruh"
  },
  {
    name: "Desert Mesa", 
    image: "https://images.unsplash.com/photo-1578977826629-43e2ff7460ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "hatt bruh"
  },
  {
    name: "just a vibe resort", 
    image: "https://images.unsplash.com/photo-1578991131964-68f1757f6dd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "dangg bruh"
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, (err) => {
    if(err) {
      console.log('Error! ' + err);
    } else {
      console.log('REMOVED ALL CAMPGROUNDS!');
    }
    // Add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if(err) {
          console.log('Error! ' + err);
        } else {
          console.log('Added a campground');
          // Create a comment for each campground
          Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, (err, comment) => {
            if(err) {
              console.log('Error! ' + err);
            } else {
              campground.comments.push(comment);
              campground.save();
              console.log('Created a new comment!');
            }
          });
        }
      });
    });
  });
  // Add a few comments
}

module.exports = seedDB;