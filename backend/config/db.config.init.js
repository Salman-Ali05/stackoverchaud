const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASS } = require('../utils/secrets');

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
});

db.connect((err) => {
    if (err) {
        console.error('❌ DB connection failed:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to MySQL');
});

module.exports = db;
