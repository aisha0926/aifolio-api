# aifolio-api

Portfolio API that utilizes REST API, CRUD Operations, Github API and Sendgrid API, built using MongoDB, Express and NodeJS.

----

## Functionalities

Currently, this API has limited functionality as it is still a work in progress. However limited it is, it comes with core functionalities required in a portfolio with admin functionalities. These are some of the functionalities you can perform with the api:

* Sign up 
* Login
* Authentication
* Admin Panel
* Send email via sendgrid
* Get git repositories
* Get an overall language percentage used across all your repositories

## How to use the API

To use the API, these are the endpoints that you need to be aware of:

> **/api/user/signup**

Requires the following properties in the req.body:

  ```
  {
      "firstName" : <value>,
      "lastName" : <value>,
      "email" : <value>,
      "password" : <value>
  }
  ```
  
> **/api/user/login**

Requires the following fields in the req.body which should return a jwt token

  ```
  {
      "email" : <value>,
      "password" : <value>,
  }
  ```
  
  > **/api/user/add**

Requires the following fields in the req.body which should return a jwt token

  ```
  {
      "email" : <value>,
      "password" : <value>,
  }
  ```

