require('dotenv/config');

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    JWT_SECRET_KEY
} = process.env;

const requiredCredentials = [
    'DB_HOST',
    'DB_USER',
    'DB_PASS',
    'DB_NAME',
    'JWT_SECRET_KEY'
];

// for (const credential of requiredCredentials) {
//     if (process.env[credential] === undefined) {
//         process.exit(1);
//     }
// }

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    JWT_SECRET_KEY
};
