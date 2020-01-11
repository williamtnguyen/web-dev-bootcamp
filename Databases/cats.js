var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

// Schema
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// Model compiled from schema (in mongoDB, "Cat" turns into plural collection "cats")
var Cat = mongoose.model("Cat", catSchema);

// // Adding a new cat to the DB
// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// george.save(function(err, cat) {
//   if(err) {
//     console.log("Something went wrong!");
//   } else {
//     console.log("Just saved a cat to the DB");
//     console.log(cat);
//   }
// }); // adds george to the DB


// Makes a new Cat and save() it all at once
Cat.create({
  name: "Snow White",
  age: 15,
  temperament: "Bland"
}, function(err, cat) {
  if(err) {
    console.log("Error: " + err);
  } else {
    console.log("New cat was made!");
    console.log(cat);
  }
});

// Retrieve all cats from the DB and console.log each
Cat.find({}, function(err, cats) {
  if(err) {
    console.log("Error: " + err);
  } else {
    console.log("All the Cats:");
    console.log(cats);
  }
});