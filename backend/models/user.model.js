const db = require('../config/db.config');
const { createNewUserQuery, findUserByEmailQuery } = require('../database/queries');

class User {
    constructor(firstname, lastname, email, password, role, invitationToken = null, structureId = null) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.invitationToken = invitationToken;
        this.structureId = structureId;
    }

    static create(newUser, cb) {
        db.query(
            createNewUserQuery,
            [
                newUser.firstname,
                newUser.lastname,
                newUser.email,
                newUser.password,
                newUser.role,
                newUser.invitationToken,
                newUser.structureId
            ],
            (err, res) => {
                if (err) {
                    console.error('❌ Error creating user:', err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    role: newUser.role
                });
            }
        );
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, [email], (err, res) => {
            if (err) {
                console.error('❌ Error finding user by email:', err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: 'not_found' }, null);
        });
    }
}

module.exports = User;
