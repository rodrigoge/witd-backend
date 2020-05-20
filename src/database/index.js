const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

mongoose.Promise = global.Promise

require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
})

module.exports = mongoose

