const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')

const app = express()

let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("App listening on port 3000")
        });
        db = getDb()
    }
})


app.get("/books", (req, res) => {
    let books = []

    db.collection('books')
        .find()
        .sort({ author: 1 })
        .forEach(book => books.push(book))
        .then(() => res.status(200).json(books))
        .catch(() => {
            res.status(500).json({ error: "Could not fetch the documents" })
        })
})

app.get("/books/:id", (req, res) => {
    const id = req.params.id
    if (ObjectId.isValid(id)) {
        db.collection('books').findOne({ _id: new ObjectId(id) })
            .then((book) => res.status(200).json(book))
            .catch(() => {
                res.status(500).json({ error: "Could not fetch the document" })
            })
    }
    else {
        res.status(301).json({ error: "id is not valid" })
    }
})