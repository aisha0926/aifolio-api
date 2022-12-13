# aifolio-api

Portfolio API that utilizes REST API, CRUD Operations, third parth API integration (Github and Sendgrid API), built using MongoDB, Express and NodeJS.

----

## Functionalities

Currently, this API has limited functionality as it is still a work in progress. However limited it is, it comes with core functionalities required in a portfolio with admin functionalities. These are some of the functionalities you can perform with the api:

* Sign up 
* Login
* Authentication (JSON Web Token)
* Admin Panel (Add and Edit data)
* Send email via sendgrid
* Get git repositories
* Get an overall language percentage used across all your repositories

## How to use the API

To use the API you will first need a couple of things set up beforehand. Create these variables and store it in your .env file.

1. SECRET - This is a secret key used for JWT Token
2. GITHUB_USER - This is github username
3. GIT_TOKEN - This is the token taken from your github account
4. DB_CONNECTION - Connection string
5. SENDGRID_API_KEY - API key generated from sendgrid (https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)
6. SENDGRID_SENDER_EMAIL - Sender email. Basically, where the email is going to come from.
7. SENDGRID_RECIPIENT_EMAIL - Email that you wish to receive the emails to
8. SENDGRID_TEMPLATE_ID - Template ID generated after creating a dynamic template (https://mc.sendgrid.com/dynamic-templates)


Upon finishing the environment set up, you can then continue to use the API using the following endpoints.

### User Endpoints

**POST**
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
     "projects": [
          {
              "label": "TEST",
              "title": "TEST",
              "description": {
                  "shortDescription": "Test",
                  "bullets": ["Did A", "Did B", "and Did C"]
              },
              "status": "In Progress",
              "projectLink": "www.blogpost.com",
              "githubLink": "www.blogpost.com",
              "technologies": [
                  "MongoDB",
                  "NodeJS",
                  "Express",
                  "React"
              ]
          }
      ]
  }
  ```
  
To update the work experience, these are the expected properties:

  ```
  {
      "workExperience": [
        {
            "year": "<Year of employment>",
            "role": "<Role title>",
            "description": {
                "shortDescription": "<Short description or a summary of what your role>",
                "bullets": [
                    "<Bullet points of what your role entailed>"
                ]
            }
        }
      ]
  }
  ```
  
  **PUT**
  > **/api/user/update**

The properties will depend on what you want to update, it can be any properties from either the Project object or the workExperience object, however, the *id* is required in order to update the desired property. The JSON object bellow is a sample of what you can do for Projects.

  ```
  {
    "id": "<object id of the project/workexperience you want to update>",
    "projects": [
          {
              "label": "TEST",
              "title": "TEST",
              "description": {
                  "shortDescription": "Test",
                  "bullets": ["Did A", "Did B", "and Did C"]
              },
              "status": "In Progress",
              "projectLink": "www.blogpost.com",
              "githubLink": "www.blogpost.com",
              "technologies": [
                  "MongoDB",
                  "NodeJS",
                  "Express",
                  "React"
              ]
          }
      ]
  }
  ```
  
To update the work experience, these are the expected properties:

  ```
  {
       "workExperience": [
        {
            "year": "<Year of employment>",
            "role": "<Role title>",
            "description": {
                "shortDescription": "<Short description or a summary of what your role>",
                "bullets": [
                    "<Bullet points of what your role entailed>"
                ]
            }
        }
      ]
  }
  ```

**GET**
  > **/api/user/get/single**

Retrieves user data from the database using the id stored in the token. You will need to send the token via the headers:

**Using fetch**
```
const login = async (token) => {
  fetch('<URL>/api/user/get/single', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          <Do something>        
        })
        .catch((e) => console.log(e.message));
   }
```

**Using axios**
```
const login = async (token) => {
  const requestData = await axios.get('<URL>/api/user/get/single', 
     headers: {
        Authorization: `Bearer ${token}`,
      }
  )
}
```

**GET**
  > **/api/user/get/all**

Retrieves all users from the database.




### Github Endpoints

These endpoints are implemented to make it easier for you to use Github API, especially if you want to get the percentage of the languages used across your repositories.

*It is a must that you have your environment setup completed (e.g. GITHUB_USER and GIT_TOKEN) in order for this to work*

**GET**
  > **/api/github/repos**

Retrieves all the repositories including private and public repositories but *excluding* the forked repo's. It works similar to github URL *"https://api.github.com/search/repositories?q=user:<username>"*.

**GET**
  > **/api/github/languages**

Retrieves all the repo's and then calculates the overall percentage across your repositories.

### Sendgrid Endpoint

This endpoint allows you to send seamlessly send email as long as you have the environment variables set up.

**POST**
  > **/api/user/email**

This endpoint sends an email to the desired recipient. These are the expected properties in your JSON file:

```
  {
      "email" : "<value>",
      "name" : "<value>",
      "number" :  "<value>",
      "sender_message" :  "<value>"
  }
```

-------------

Thank you!

