const express = require("express");
const { ObjectId } = require("mongodb");

//init app & middleware

const app = express();
const { connectToDb, getDb } = require("./db");

app.use(express.json());
//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
    db = getDb();
  }
});

//routes
app.get("/books", (req, res) => {
  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => res.status(500).json({ err }));

  // res.json({ msg: "welcome to the api" });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.status(500).json({ err }));
  } else {
    res.status(500).json("Id is not valid");
  }
});

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => res.status(500).json(err));
});

app.delete("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.status(500).json({ err }));
  } else {
    res.status(500).json("Id is not valid");
  }
});

app.patch("/books/:id", (req, res) => {
  const book = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: book })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.status(500).json({ err }));
  } else {
    res.status(500).json("Id is not valid");
  }
});
