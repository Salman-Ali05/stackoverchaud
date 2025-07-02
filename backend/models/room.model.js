const db = require('../config/db.config.init');

const Room = {
  create: (data, cb) => {
    const query = `
      INSERT INTO rooms (name, capacity, type, accessible_to_students, floor_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [data.name, data.capacity, data.type, data.accessible_to_students, data.floor_id], cb);
  },

  findAll: (cb) => {
    db.query('SELECT * FROM rooms', cb);
  },

  findById: (id, cb) => {
    db.query('SELECT * FROM rooms WHERE id = ?', [id], cb);
  },

  update: (id, data, cb) => {
    const query = `
      UPDATE rooms
      SET name = ?, capacity = ?, type = ?, accessible_to_students = ?, floor_id = ?
      WHERE id = ?
    `;
    db.query(query, [data.name, data.capacity, data.type, data.accessible_to_students, data.floor_id, id], cb);
  },

  delete: (id, cb) => {
    db.query('DELETE FROM rooms WHERE id = ?', [id], cb);
  }
};

module.exports = Room; 