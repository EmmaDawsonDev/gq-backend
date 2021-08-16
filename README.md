A REST API by Emma Dawson

### User model

`const user = { _id: "", username: "Emma", email: "emma@test.com", password: "hashedPassword", points: 0 }`

### Questions model

`const questionObj = { type: "Feature", properties: { city: "Stockholm", question: "What is the question?", answer: ["answer", "anser", "svar" "svaret"], answeredBy: ["user1_id", "user3_id", "user31_id"], }, geometry: { type: "Point", coordinates: [longitude, latitude], }, };`

### User Endpoints

| Method | Endpoint      | Requested information               | Expected Response                                                 |
| ------ | ------------- | ----------------------------------- | ----------------------------------------------------------------- |
| POST   | /users        | username, email, password           | `{success: true, message: "User with id __ successfully created}` |
| POST   | /authenticate | email, password                     | `{_id, username, email, points, token}`                           |
| PATCH  | /myProfile    | optional: username, email, password | `{message: Updated __ user(s)}`                                   |
| DELETE | /myProfile    | --                                  | `{message: `User with id \_\_ deleted`}`                          |

### Question Endpoints

| Method | Endpoint       | Requested information                       | Expected Response                                                     |
| ------ | -------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| POST   | /questions     | question, answer, city, latitude, longitude | `{success: true, message: "Question with id __ successfully created}` |
| PATCH  | /questions/:id | answer                                      | `{ message: "Correct!" } `                                            |
| GET    | /questions     | query params lat lon                        | `{"responseArray": [{                                                 |

            "_id": "6113de66964540cf1ee3d0c0",
            "type": "Feature",
            "properties": {
                "city": "Vagnhärad",
                "question": "What is the name of the shop?",
                "answered": true
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    17.489693,
                    58.945961
                ]
            }
        }]` |

## Environmental Variables

PORT  
DBUSER  
DBPASSWORD  
JWT_SECRET
