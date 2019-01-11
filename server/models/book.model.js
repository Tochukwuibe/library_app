const mongoose = require('mongoose');
const bsrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRETE } = require('../config/config');
const SALT = 10;


const bookSchema = new mongoose.Schema({
    author: { type: String, required: true },
    raiting: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
    },
    name: {
        type: String,
        maxlength: 100,
    },
    pages: {
        type: String,
        maxlength: 100,
        default: 'n/a'
    },
    reviewer: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: 'User'
    },
    review: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
}, { timestamps: true })



const Book = mongoose.model('Book', bookSchema)


module.exports = Book;