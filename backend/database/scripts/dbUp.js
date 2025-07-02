const { createDB: createDBQuery } = require('../queries');

(() => {
  const db = require('../../config/db.config.init');

  db.query(createDBQuery, (err, _) => {
    if (err) {
      console.error('❌ Error creating database:', err.message);
      return;
    }
    console.log('✅ Database created (or already exists)');
    process.exit(0);
  });
})();
