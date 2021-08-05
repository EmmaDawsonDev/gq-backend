const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://a${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.2dhlq.mongodb.net/geoQuizzr?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
