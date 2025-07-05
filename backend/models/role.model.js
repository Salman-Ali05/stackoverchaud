const db = require('../config/db.config.init');

const Role = {
    getAll: (cb) => {
        db.query('SELECT * FROM roles', cb);
    },

    getById: (id, cb) => {
        db.query('SELECT * FROM roles WHERE id = ?', [id], cb);
    },

    create: (name, cb) => {
        db.query('INSERT INTO roles (name) VALUES (?)', [name], cb);
    },

    update: (id, name, cb) => {
        db.query('UPDATE roles SET name = ? WHERE id = ?', [name, id], cb);
    },

    delete: (id, cb) => {
        db.query('DELETE FROM roles WHERE id = ?', [id], cb);
    }
};

module.exports = Role;
