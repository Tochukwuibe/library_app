const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { SECRETE } = require('../config/config');
const SALT = 10;



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 225
    },
    firstname: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    lastlogin: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })



// Hash the user password before save  if changed 
userSchema.pre('save', function (next) {
    console.log('runnig b4 save', this.isNew, this.isModified('password'));
    if (this.isNew || this.isModified('password')) {

        bcrypt.genSalt(SALT, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;

                next();
            })
        });


    }
})

userSchema.statics.login = async function (email, password, refresh) {

    try {

        if (refresh) {
            console.log('the refresh token ', refresh);
            const decoded = jwt.verify(refresh, SECRETE);
            if (!decoded) return null;
        }


        const user = await this.findOne({ email })
        if (!user) return undefined;

        const comp = bcrypt.compare(password, user.password)
        if (!comp) return null;



        const payload = user.toObject();

        const token = jwt.sign({ ...payload, expires: moment().add(1, 'hour').toDate() }, SECRETE);
        const refreshToken = jwt.sign({ released: new Date() }, SECRETE)

        if (!refresh) {
            await user.update({ lastlogin: Date.now() });
        }

        return { token: token, refresh: refreshToken, user: payload };

    } catch (e) {
        console.log('the error ', e);
        return null

    }
}


userSchema.statics.verifyToken = function (token) {

    const decoded = jwt.decode(token, SECRETE);
    if (!decoded) throw new Error('invalid token')
    return decoded;
}


userSchema.statics.getUserByToken = async function (token) {
    try {

        const decoded = jwt.decode(token, SECRETE);
        if (!decoded) return null;

        const user = await this.findById(decoded._id).lean();

        return { user, token };

    } catch (e) {

        return null;
    }

}





const User = mongoose.model('User', userSchema)


module.exports = User;