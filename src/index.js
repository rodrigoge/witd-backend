const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://whereisthedoctor:whereisthedoctor@cluster0-9stkw.mongodb.net/witddb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(express.json())
app.use(routes)

app.listen(3333)