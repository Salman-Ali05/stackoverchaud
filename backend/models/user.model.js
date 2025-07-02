const db = require('../config/db.config');
const { createNewUserQuery, findUserByEmailQuery } = require('../database/queries');

const User = {
  create: (newUser, cb) => {
    db.query(createNewUserQuery, [
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.invitationToken,
      newUser.structureId
    ], cb);
  },

  findByEmail: (email, cb) => {
    db.query(findUserByEmailQuery, [email], (err, results) => {
      if (err) return cb(err, null);
      if (results.length === 0) return cb(null, null);
      cb(null, results[0]);
    });
  }
};

module.exports = User;
