const express = require('express');
const router = express.Router();

const Review = require('../../models/reviews.model');



router.get('/', (req, res) => {

    Review.find({ user: req.query.userId }).populate('user').populate('book').exec((err, reviews) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(reviews.map((doc) => doc.toObject()));
    });

})

router.post('/', (req, res) => {

    const review = new Review(req.body);
    review.save((err, doc) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(doc.toObject());
    });

})



module.exports = router