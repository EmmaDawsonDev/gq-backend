A REST API by Emma Dawson

### User model

`const user = { _id: "", username: "Emma", email: "emma@test.com", password: "hashedPassword", points: 0 }`

### Questions model

`const question = { _id: "", location: { type: "Point", coordinates: [longitude, latitude] }, question: "Here is the question", answer: "answer", answeredBy: [userId1, userId2, userId4] }`

### User Endpoints

| Endpoint           | Requested information               | Expected Response                                                 |
| ------------------ | ----------------------------------- | ----------------------------------------------------------------- |
| POST /users        | username, email, password           | `{success: true, message: "User with id __ successfully created}` |
| POST /authenticate | email, password                     | `{_id, username, email, points, token}`                           |
| PATCH /myProfile   | optional: username, email, password | `{message: Updated __ user(s)}`                                   |

### Question Endpoints

| Endpoint        | Requested information                       | Expected Response                                                     |
| --------------- | ------------------------------------------- | --------------------------------------------------------------------- |
| POST /questions | question, answer, city, latitude, longitude | `{success: true, message: "Question with id __ successfully created}` |
