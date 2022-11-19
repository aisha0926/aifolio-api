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

To use the API you will first need a couple of things set up beforehand. Create these variables and store it in your .env file.

1. SECRET - This is a secret key used for JWT Token
2. GITHUB_USER - This is github username
3. GIT_TOKEN - This is the token taken from your github account
4. DB_CONNECTION - Connection string


Upon finishing the environment set up, you can then continue to use the API using the following endpoints.

**GET**
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
  
**GET**
> **/api/user/login**

Requires the following fields in the req.body which should return a jwt token

  ```
  {
      "email" : <value>,
      "password" : <value>,
  }
  ```
  
**PUT**
  > **/api/user/add**

The properties will depend on what you want to update, it can be the workExperience or the Projects. The JSON object bellow is a sample of what you can do for Projects.

  ```
  {
      "projects" : {
          "title" : "Blog Post",
          "subtitle" : "Fullstack Web Application",
          "description" : "This is a fullstack web application for....",
          "typeOfProjects" : "Fullstack",
          "status" : "In Progress",
          "link" : "www.blogpost.com",
          "technologies" : ["MongoDB", "NodeJS","Express", "React"]
      }
  }
  ```
  
To update the work experience, these are the expected properties:

  ```
  {
      "workExperience" : {
          "role" : "Food Tester",
          "year" : "2023-2024",
          "description" : "Example work experience description",
          "archive" : false,
      }
  }
  ```


