const mongoose    = require('mongoose');
      Campground  = require('./models/campground');
      Comment     = require('./models/comment');


var data = [
  {
    name: "Cloud's Rest", 
    image: "https://images.unsplash.com/photo-1578946841286-ab4940e38339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Turkey pastrami tenderloin tongue bacon turducken ham brisket burgdoggen short ribs shoulder beef ribs kevin buffalo drumstick. Short loin landjaeger pork, fatback brisket buffalo ball tip biltong kevin. Ball tip ground round landjaeger, leberkas meatball short ribs chislic. Capicola filet mignon meatloaf, turkey landjaeger ham shank ribeye cow strip steak. Landjaeger meatball beef, tongue porchetta rump swine pork belly kevin. Meatloaf prosciutto shankle cupim, pork belly cow fatback spare ribs burgdoggen pancetta. Shankle chicken bresaola tail, prosciutto salami ham hock."
  },
  {
    name: "Desert Mesa", 
    image: "https://images.unsplash.com/photo-1578977826629-43e2ff7460ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Salami shoulder fatback shank, spare ribs ball tip turkey t-bone turducken. Andouille leberkas pancetta, turkey meatball swine ham flank chislic boudin spare ribs shank shankle buffalo. Rump shoulder pig, cupim picanha porchetta shankle turducken leberkas brisket strip steak chislic. Burgdoggen brisket landjaeger hamburger porchetta beef ribs. Ham hock bacon venison tenderloin, rump ham leberkas beef ribs kielbasa corned beef ribeye. Beef ribs meatball bacon, kielbasa t-bone fatback doner corned beef tongue pastrami sirloin prosciutto pork chicken leberkas."
  },
  {
    name: "just a vibe resort", 
    image: "https://images.unsplash.com/photo-1578991131964-68f1757f6dd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Flank tri-tip hamburger doner meatloaf. Venison short loin capicola buffalo, landjaeger picanha ribeye doner ham hock alcatra jowl shankle drumstick. Porchetta sausage pastrami prosciutto. Chislic spare ribs alcatra picanha, sirloin beef ribs cupim cow beef pork loin kielbasa corned beef. Brisket ham biltong alcatra turkey cow porchetta. Strip steak spare ribs tongue chuck, flank meatball ham hock beef bacon doner pancetta."
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
}

module.exports = seedDB;