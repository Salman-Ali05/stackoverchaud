const { dropDB: dropDBQuery } = require('../queries');

(() => {
    require('../../config/db.config.init').query(dropDBQuery, (err, _) => {
        if (err) {
            return;
        }
        process.exit(0);
    });
})();