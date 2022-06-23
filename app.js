const express = require("express");

//init app & middleware

const app = express();
const { connectToDb, getDb } = require("./db");

//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  }
  db = getDb();
});

//routes
app.get("/books", (req, res) => {
  res.json({ msg: "welcome to the api" });
});
