const express = require('express');
const router = express.Router();

const User = require('../../models/user.model');
const auth = require('../../middleware/auth.js')


router.post('/register', async (req, res) => {
    let status = 200;
    let data;
    try {

        const user = new User(req.body);
        await user.save();
        data = user;

    } catch (e) {
        status = 500;
        data = e;
    }

    res.status(status).send(data);
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const payload = await User.login(email, password);


    if (!payload) return res.status(400).send('invlid login credentials');
    const { token, refresh, user } = payload;

    res.status(201).cookie('auth', token).cookie('auth-refresh', refresh).send(user);
})


router.get('/', (req, res) => {

    if (req.query.token) {
        return User.getUserByToken(req.query.token).then((data) => {
            res.status(200).send(data)
        })
    }


    User.find({}, (err, users) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(users.map((doc) => doc.toObject()));
    })
})




module.exports = router