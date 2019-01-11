const express = require('express');
const Book = require('../../models/book.model');

const router = express.Router();



// Get BOOKS
router.get('/', async (req, res) => {

    const action = req.query.queryBy;

    switch (action) {
        case 'author': {
            return queryByAuthor(req, res);
        }

        case 'reviewer': {
            return queryByUser(req, res);
        }

        default: {
            return queryByAll(req, res);
        }
    }

});


// GET Book
router.get('/:id', async (req, res) => {
    let status = 200;
    let data;
    try {

        data = await Book.findById(req.params.id).populate('reviewer').lean();


    } catch (e) {

        status = 500;
        data = e;
        console.log('the error ', e);
    }
    res.status(status).send(data);
})

// ADD BOOK 
router.post('/', async (req, res) => {
    let status = 201;
    let data;

    try {

        let book = new Book(req.body);
        book = await book.save();
        data = book;
    } catch (e) {
        console.log('the error ', e);
        status = 500;
        data = e;
    }

    res.status(status).send(data)

});

// UPDATE BOOK
router.put('/:id', async (req, res) => {
    let status = 201;
    let data;

    try {

        data = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();

    } catch (e) {
        console.log('the error ', e);
        status = 500;
        data = e;
    }

    res.status(status).send(data)
});


router.delete('/:id', async (req, res) => {
    let status = 200;
    let data;

    try {

        data = await Book.deleteOne({ _id: req.params.id })

    } catch (e) {
        console.log('the error ', e);
        status = 500;
        data = e;
    }

    res.status(status).send(data)
})


module.exports = router




async function queryByAll(req, res) {
    console.log('querying by all');
    let status = 200;
    let data;
    try {
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const order = parseInt(req.query.order);
        data = await Book.find().skip(skip || 0).sort({ _id: order || 'asc' }).limit(limit).populate('reviewer')
            .exec();


    }
    catch (e) {
        status = 500;
        data = e;
    }
    res.status(status).send(data);
}

async function queryByAuthor(req, res) {
    console.log('querying by author');
    let status = 200;
    let data;
    try {

        data = await Book.find({ author: req.query.authorId }).populate('reviewer');
    }
    catch (e) {
        status = 500;
        data = e;
    }
    res.status(status).send(data);
}

async function queryByUser(req, res) {
    console.log('querying by user');
    let status = 200;
    let data;
    try {

        data = await Book.find({ reviewer: req.query.reviewerId }).populate('reviewer');
    }
    catch (e) {
        status = 500;
        data = e;
    }
    res.status(status).send(data);
}
