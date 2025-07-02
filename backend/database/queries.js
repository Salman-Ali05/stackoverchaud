const { DB_NAME } = require('../utils/secrets');

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;
const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'teacher', 'student') NOT NULL,
  invitationToken VARCHAR(255),
  structureId INT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

const createNewUserQuery = `
INSERT INTO users (
  firstname,
  lastname,
  email,
  password,
  role,
  invitationToken,
  structureId,
  created_on
) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmailQuery = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
  createDB,
  dropDB,
  createTableUsers,
  createNewUserQuery,
  findUserByEmailQuery
};
