const express = require('express')
const { connectToDb, getDb } = require('./db')

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
    db.collection('books').find()
    res.json({ msgg: "Welcome to API LOL" })
})


