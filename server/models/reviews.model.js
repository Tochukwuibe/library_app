const mongoose = require('mongoose');
const bsrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRETE } = require('../config/config');
const SALT = 10;



const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Book'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    value: {
            type: Number,
            min: 0,
            max: 5
        }

}, { timestamps: true })



const Review = mongoose.model('Review', reviewSchema);


module.exports = Review;