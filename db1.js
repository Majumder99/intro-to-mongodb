// Atlas connection

const MongoClient = require("mongodb").MongoClient;

let dbConnection;

const url =
  "mongodb+srv://sourav:sourav@cluster0.yizcs.mongodb.net/?retryWrites=true&w=majority";
const dbName = "bookcollection";
let db;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        return cb(err);
      }

      // Storing a reference to the database so you can use it later
      dbConnection = client.db(dbName);
      console.log(`Connected MongoDB: ${url}`);
      console.log(`Database: ${dbName}`);
      return cb();
    });
  },
  getDb: () => dbConnection,
};
