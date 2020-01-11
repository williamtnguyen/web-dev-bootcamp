# RESTful Routing

## Introduction
* Define REST and explain WHY it matters
  * Representational State Transfer
* List all 7 RESTful routes
* Show example of RESTful routing in practice

* REST - a mapping between HTTP routes and CRUD
  * BLOG APP:
    * CREATE  - /blogs, 'POST'
    * READ    - /allBlogs or /blogs/:id
      * INDEX(all) & SHOW(singular)
    * UPDATE  - /updateBlog/:id/, 'PUT'
    * DESTROY - /destroyBlog/:id, 'DELETE'


# Blog Index
* Setup the Blog App
* Create the Blog model
* Add INDEX route and template
* Add Simple Nav Bar