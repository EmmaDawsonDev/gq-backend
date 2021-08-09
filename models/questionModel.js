// _id - automatically generated
// Geojson
// coords - [lat, lon]
// question - str
// answer - str
// answeredBy - array of userId references (relation to user model). This should not be sent to individual users. Use projection to create a new field answered - true/false based on this array.

// Data can be modified before sending to the front end so that answered: true/false is included
// depending on whether the userId is in the answeredBy reference array.

// const question = {
//   _id: "",
//   location: {
//     type: "Point",
//     coordinates: [longitude, latitude]
//   },
//   question: "Here is the question",
//   answer: "answer",
//   answeredBy: [userId1, userId2, userId4]
// }
