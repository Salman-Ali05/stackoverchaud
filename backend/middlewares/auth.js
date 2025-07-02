const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', message: 'Token required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded; // contient id et role
        next();
    } catch (err) {
        res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
};

module.exports = verifyToken;
