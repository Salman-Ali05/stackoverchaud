const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../utils/secrets');

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection error:', err.message);
        process.exit(1);
    } else {
        console.log('✅ MySQL database connected');
    }
});

module.exports = connection;
