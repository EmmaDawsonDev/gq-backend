const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.o0kcx.mongodb.net/geoQuizzr?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Users = client.db("geoQuizzr").collection("Users");
const Questions = client.db("geoQuizzr").collection("Questions");

module.exports = client;
module.exports = Object.assign(module.exports, {
  Users,
  Questions,
});
