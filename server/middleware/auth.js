const User = require('../models/user.model')

module.exports = async (req, res, next) => {
    try {

        console.log('in auth');
        const token = req.cookies.auth;
        const refresh = req.cookies['auth-refresh'];


        if (!token) return res.status(401).end();
        if (!refresh) return res.status(401).end();

        const decoded = User.verifyToken(token);

       
        console.log('the decoded ', decoded)
        if (new Date(decoded.expires) < new Date()) {
            
            console.log('token expired so re authenticating')
            const { email, password } = decoded;

            const payload = await User.login(email, password, refresh);
            if (payload) res.cookie('auth', payload.token).cookie('auth-refresh', payload.refresh)
        }

        req['_user'] = decoded;

        next();
    } catch (e) {
        res.status(401).end();
    }

}