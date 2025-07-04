const db = require('../../config/db.config.init');
const {
  createTableRoles,
  insertDefaultRoles,
  createTableUsers,
  createTableRooms,
  createTableReservations,
  createTableNotifications,
  createTableInvitations
} = require('../queries');

const createTables = [
  { name: 'roles', query: createTableRoles },
  { name: 'insert default roles', query: insertDefaultRoles },
  { name: 'users', query: createTableUsers },
  { name: 'rooms', query: createTableRooms },
  { name: 'reservations', query: createTableReservations },
  { name: 'notifications', query: createTableNotifications },
  { name: 'invitations_registration', query: createTableInvitations }
];

(async () => {
  for (const table of createTables) {
    try {
      await new Promise((resolve, reject) => {
        db.query(table.query, (err) => {
          if (err) {
            console.error(`❌ Failed to process "${table.name}":`, err.message);
            reject(err);
          } else {
            console.log(`✅ "${table.name}" processed successfully`);
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
