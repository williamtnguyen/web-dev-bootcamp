// Requests to APIS: sort of a recipe to follow

// // ES6 from github.com/request/request
// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

// Old JS from bootcamp
var request = require('request');
request('http://www.pornhub.com', function(error, response, body) {
  if(!error && response.statusCode == 200) {
    // Things worked! 
    console.log(body);
  } else {
    console.log("Something went wrong!");
    console.log(error);
  }
});