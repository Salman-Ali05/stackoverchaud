const db = require('../config/db.config.init');

const Reservation = {
  create: (data, cb) => {
    const query = `
      INSERT INTO reservations (user_id, room_id, date, start_time, end_time)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [data.user_id, data.room_id, data.date, data.start_time, data.end_time], cb);
  },

  findAll: (cb) => {
    db.query('SELECT * FROM reservations', cb);
  },

  findById: (id, cb) => {
    db.query('SELECT * FROM reservations WHERE id = ?', [id], cb);
  },

  update: (id, data, cb) => {
    const query = `
      UPDATE reservations 
      SET user_id = ?, room_id = ?, date = ?, start_time = ?, end_time = ?
      WHERE id = ?
    `;
    db.query(query, [data.user_id, data.room_id, data.date, data.start_time, data.end_time, id], cb);
  },

  delete: (id, cb) => {
    db.query('DELETE FROM reservations WHERE id = ?', [id], cb);
  }
};

module.exports = Reservation;
