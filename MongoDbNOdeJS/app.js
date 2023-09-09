const express = require('express')
const app = express()




app.get("/books", (req , res) => {
    res.json({msgg : "Welcome to API LOL"})
})



app.listen(3000 , () => {
    console.log("App listening on port 3000")
});