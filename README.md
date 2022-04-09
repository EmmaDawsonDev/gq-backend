# geoQuizzr

This backend REST API is for a map-based quiz called geoQuizzr and is built with Node.js, Express and a mongoDB database. The database has two collections: Users and Questions.

### Base URL

/api/v1/endpoint

### Headers

Authorization - Bearer token required for several routes    
Content-Type - application/json

### User model

    const user = {
       _id: "",
       username: "Emma",
       email: "emma@test.com",
       password: "hashedPassword",
       score: 0,
       role: "user" }

### Questions model

    const questionObj = {
       type: "Feature",
       properties: {
         city: "Stockholm",
         question: "What is the question?",
         answer: ["answer", "anser", "svar" "svaret"], // can take several variations to account for common spelling errors/different languages
         answeredBy: ["user1_id", "user3_id", "user31_id"], },
       geometry: {
         type: "Point",
         coordinates: [longitude, latitude],
         },
      };

### User Endpoints

| Method | Endpoint      | Requested information               | Auth  | Expected Response                                                 |
| ------ | ------------- | ----------------------------------- | ----- | ----------------------------------------------------------------- |
| POST   | /users        | username, email, password           |       | `{success: true, message: "User with id __ successfully created}` |
| POST   | /authenticate | email, password                     |       | `{_id, username, email, score, role, token}`                           |
| PATCH  | /myProfile    | optional: username, email, password | token | `{message: Updated __ user(s)}`                                   |
| DELETE | /myProfile    | --                                  | token | `{message: User with id __ deleted}`                              |

### Question Endpoints

| Method | Endpoint       | Requested information                       | Auth               | Expected Response                                                     |
| ------ | -------------- | ------------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| POST   | /questions     | question, answer, city, latitude, longitude | token - admin only | `{success: true, message: "Question with id __ successfully created}` |
| PATCH  | /questions/:id | answer                                      | token              | `{ message: "Correct!" } `                                            |
| GET    | /questions     | query params lat lon                        | token              | See response below                                                    |

### Response for GET /questions - limited to a radius of 1km and 100 documents

      {"responseArray": [ {
        "_id": "6113de66964540cf1ee3d0c0",
        "type": "Feature",
        "properties": {
           "city": "Vagnhärad",
           "question": "What is the name of the shop?",
           "answered": true },
        "geometry": {
           "type": "Point",
           "coordinates": [ 17.489693, 58.945961 ]
            }
         }]

### Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Add .env file (see below)

Start the server

```bash
  npm start
```

### .env - Environmental Variables

Add a .env file with the following variables to run this project:

PORT - Default port 5000   
DBUSER - From mongoDB     
DBPASSWORD - From mongoDB   
JWT_SECRET - choose a word or phrase of your choice   
