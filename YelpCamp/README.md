# YelpCamp v1
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds
* Each Campground has: 
  * Name
  * Image
  * Example: 
  [
    {name: "Salmon Creek", image: "http://image.net"}
  ]


## Layout and Basic Styling
  * Create our header and footer partials
  * Add in Bootstrap


## Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form


## Style the Campgrounds Page
* Add a better header/title
* Make campgrounds display in a grid

## Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form



# YelpCamp v2

## Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

## Show Page
* Review the RESTful routes we've seen so far
* Add a description to our campground model
* Show db.collection.drop()
* Add a show route/template

* RESTFUL ROUTES
name       url       verb       desc.
=========================================
INDEX     /dogs       GET      Display a list of all dogs 
NEW       /dogs/new   GET      Display form to make a new dog (not POST route)
CREATE    /dogs       POST     Add new dog to DB
SHOW      /dogs/:id   GET      Shows info about one dog


# YelpCamp v3

## Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

## Add a seeds file (for sample data to check if functionalities work)
* Add a seeds.js file
* Run the seeds file every time the server starts

## Add the Comment model!
* Make our errors go away
* Display comments on campground show page

## Comment New/Create
* Discuss nested routes
* Add the comment NEW and CREATE routes
* Add the new comment button