const db = require('../../config/db.config');
const { createTableUsers } = require('../queries');

db.query(createTableUsers, (err) => {
    if (err) {
        console.error('❌ Failed to create `users` table:', err.message);
        process.exit(1);
    }
    console.log('✅ Table `users` created successfully');
    process.exit(0);
});