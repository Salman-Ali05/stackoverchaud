const { dropDB: dropDBQuery } = require('../queries');
const db = require('../../config/db.config.init');

(() => {
    db.query(dropDBQuery, (err, _) => {
        if (err) {
            console.error('❌ Failed to drop database:', err.message);
            process.exit(1);
        }
        console.log('✅ Database dropped successfully');
        process.exit(0);
    });
})();
