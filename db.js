const MongoClient = require("mongodb").MongoClient;

let dbConnection;

// module.exports = {
//   connectToDb: (cb) => {
//     MongoClient.connect("mongodb://localhost:27017/bookcollection")
//       .then((client) => {
//         dbConnection = client.db();
//         return cb();
//       })
//       .catch((err) => {
//         console.log(err);
//         return cb(err);
//       });
//   },
//   getDb: () => dbConnection,
// };

const url = "mongodb://127.0.0.1:27017";
const dbName = "bookcollection";
let db;

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err);

//   // Storing a reference to the database so you can use it later
//   dbConnection = client.db(dbName);
//   console.log(`Connected MongoDB: ${url}`);
//   console.log(`Database: ${dbName}`);
// });

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
