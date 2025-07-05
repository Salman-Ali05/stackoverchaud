const db = require('../config/db.config.init');

const Invitation = {
    create: (invitation, cb) => {
        const query = `
      INSERT INTO invitations_registration (email, token)
      VALUES (?, ?)
    `;
        db.query(query, [invitation.email, invitation.token], cb);
    },

    findByToken: (token, cb) => {
        const query = `SELECT * FROM invitations_registration WHERE token = ?`;
        db.query(query, [token], (err, results) => {
            if (err) return cb(err, null);
            if (results.length === 0) return cb(null, null);
            cb(null, results[0]);
        });
    },

    markAsUsed: (token, cb) => {
        const query = `UPDATE invitations_registration SET used = TRUE WHERE token = ?`;
        db.query(query, [token], cb);
    }
};

module.exports = Invitation;
