// _id - automatically created
// userName - string validate characters only contain letters and numbers
// email - string - validate that it is an
// password - string (encrypted with bcrypt)
// points - number
// level - number
// questionsAnswered - array full of references to questionIds (Relation to questions model)
// badges - array of badges

// Relation:
// Many to many
// One user can answer many questions
// One question can be answered by many users
