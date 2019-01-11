const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { DATABASE, PORT } = require('./config/config');
const users = require('./routes/users/index');
const books = require('./routes/books/index.js');
const reviews = require('./routes/reviews/index.js');
const  auth  = require('./middleware/auth');

mongoose.Promise = global.Promise;

async function init() {

    const app = express();
    await connect()

    app.use(bodyParser.json());
    app.use(cookieParser());
    
    app.use('/api/users', users);

    // app.use(auth);
    app.use('/api/books', books);
    app.use('/api/reviews', reviews);

    app.listen(PORT, (err) => {
        if (!err) return console.log(`server listening on ${PORT}`)
        console.log('an error occoured starting server ', err);
    })
}

function connect() {
    mongoose.connect(DATABASE, { useNewUrlParser: true })
        .then(() => console.log('connected to mongodb'))
        .catch(() => console.log('failed to connect to db'))
}

init()