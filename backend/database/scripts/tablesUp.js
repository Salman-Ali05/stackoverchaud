const db = require('../../config/db.config.init');
const {
  createTableUsers,
  createTableRooms,
  createTableReservations,
  createTableNotifications
} = require('../queries');

// Liste des requêtes dans l’ordre à exécuter
const createTables = [
  { name: 'users', query: createTableUsers },
  { name: 'rooms', query: createTableRooms },
  { name: 'reservations', query: createTableReservations },
  { name: 'notifications', query: createTableNotifications }
];

(async () => {
  for (const table of createTables) {
    try {
      await new Promise((resolve, reject) => {
        db.query(table.query, (err) => {
          if (err) {
            console.error(`❌ Failed to create \`${table.name}\` table:`, err.message);
            reject(err);
          } else {
            console.log(`✅ Table \`${table.name}\` created successfully`);
            resolve();
          }
        });
      });
    } catch (e) {
      process.exit(1);
    }
  }
  process.exit(0);
})();
