// _id - automatically created
// username - string validate at least 2 characters. This will only be used inside the app as a display name.
// email - string - validate that it is an email
// password - string (encrypted with bcrypt), alphanumeric, at least 6 characters long
// points - number
// level - number Maybe doesn't need to be stored, it can be calculated from points
// questionsAnswered - array full of references to questionIds (Relation to questions model) put this on the questions Model instead

// Relation:
// Many to many
// One user can answer many questions
// One question can be answered by many users

// const user = {
//   _id: "",
//   username: "Emma",
//   email: "emma@test.com",
//   password: "hashedPassword",
//   points: 0
// }
