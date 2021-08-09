// _id - automatically created
// userName - string validate characters only contain letters and numbers
// email - string - validate that it is an
// password - string (encrypted with bcrypt)
// points - number
// level - number Maybe doesn't need to be stored, it can be calculated from points
// questionsAnswered - array full of references to questionIds (Relation to questions model) put this on the questions Model instead

// Relation:
// Many to many
// One user can answer many questions
// One question can be answered by many users
