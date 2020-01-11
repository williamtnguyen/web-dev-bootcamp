const express = require('express');
const app = express();
const request = require('request');


// Setting default view engine
app.set('view engine', 'ejs');
// Tells express to serve contents from "public" directory for CSS and JS
app.use('/public', express.static('public'));

// ROUTES: Search and Results
app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  var query = req.query.search;
  var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
  // On '/results' route, make API call to
  request(url, (error, response, body) => {
    if(!error && response.statusCode == 200) {
      // API successfully connected
      var parsedData = JSON.parse(body);
      res.render('results', {parsedData : parsedData});
    } else {
      console.log("Something went wrong!");
      console.log(error);
    }
  });
  
});


// Start server
const port = 3000;
app.listen(port, function() {
  console.log('Movie app has started on port ' + port);
});