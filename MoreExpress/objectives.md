# Rendering HTML and Templates

* Use res.render() to render HTML(from and EJS file)
* Explain what EJS is and why we use it
  * Embedded JS in HTML markup
* Pass variables to EJS templates


# EJS Control Flow

* Show examples of control flow in EJS templates
* Write if statements in an EJS file
* Write loops in an EJS file
* Diff type of tags in EJS: 
  * <%= %>: Shows up in HTML markup
  * <% %>: Doesn't show up in HTML markup, pure JS logic
  * <%- %>


# Styles and Partials

* Show how to properly include public assets
* Properly configure our app to use EJS
* Use partials to "DRY" (don't repeat yourself) up our code!

# EJS v3.0.1 syntax update:

* Before: <% include partials/header %>
* After: <%- include("partials/header") %>


# Post Requests

* Write post routes, and test them with Postman
* Use a form to send a post request
* Use body parser to get form data