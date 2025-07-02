const User = require('../models/user.model');

const checkEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({
            status: 'error',
            message: 'Email is required'
        });
    }

    User.findByEmail(email, (err, data) => {
        if (err && err.kind !== 'not_found') {
            return res.status(500).send({
                status: 'error',
                message: 'Error checking email'
            });
        }

        if (data) {
            return res.status(400).send({
                status: 'error',
                message: `A user with email '${email}' already exists`
            });
        }

        next();
    });
};

module.exports = checkEmail;
