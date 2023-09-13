const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:8080',
}));


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

    const page = req.query.p || 0
    const booksPerPage = 3

    db.collection('books')
        .find()
        .sort({ author: 1 })
        .skip(page * booksPerPage)
        .limit(booksPerPage)
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





app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch((err) => {
            res.status(500).json({ err: err })
        })
})




app.delete('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('books')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete document' })
            })

    } else {
        res.status(500).json({ error: 'Could not delete document' })
    }
})


app.patch('/books/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('books').updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    } else {
        res.status(500).json({ error: 'Could not update document' })
    }
})