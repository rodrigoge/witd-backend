require('dotenv').config();

const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

mongoose.connect(
    process.env.MONGO_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false 
    }
);

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333)