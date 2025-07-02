const db = require('../config/db.config.init');

const Notification = {
  create: (notification, callback) => {
    const query = `
      INSERT INTO notifications (user_id, content, sent_at, status, type)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      notification.user_id,
      notification.content,
      notification.sent_at,
      notification.status,
      notification.type
    ];
    db.query(query, values, callback);
  },

  getAll: (callback) => {
    db.query('SELECT * FROM notifications', callback);
  },

  getByUserId: (user_id, callback) => {
    db.query('SELECT * FROM notifications WHERE user_id = ?', [user_id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM notifications WHERE id = ?', [id], callback);
  }
};

module.exports = Notification;