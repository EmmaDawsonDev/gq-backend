A REST API by Emma Dawson

### User Endpoints

| Endpoint           | Requested information     | Expected Response                                                 |
| ------------------ | ------------------------- | ----------------------------------------------------------------- |
| POST /users        | username, email, password | `{success: true, message: "User with id __ successfully created}` |
| POST /authenticate | email, password           | `{_id, username, email, token}`                                   |
