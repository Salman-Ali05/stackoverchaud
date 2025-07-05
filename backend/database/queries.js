const { DB_NAME } = require('../utils/secrets');

/* ------------------------- DATABASE INIT ------------------------- */
const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;
const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

/* ----------------------------- ROLES ----------------------------- */
const createTableRoles = `
CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
)
`;

const insertDefaultRoles = `
INSERT INTO roles (name)
VALUES ('admin'), ('structure'), ('teacher'), ('student')
ON DUPLICATE KEY UPDATE name = name
`;

/* ----------------------------- USERS ----------------------------- */
const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  invitation_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_user_invitation FOREIGN KEY (invitation_id) REFERENCES invitations_registration(id)
)
`;

/* -------------------------- ROOMS -------------------------- */
const createTableRooms = `
CREATE TABLE IF NOT EXISTS rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  accessible_to_students TINYINT(1) NOT NULL,
  floor_id INT DEFAULT NULL,
  INDEX idx_floor_id (floor_id)
)
`;

/* ----------------------- RESERVATIONS ---------------------- */
const createTableReservations = `
CREATE TABLE IF NOT EXISTS reservations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_room_id (room_id),
  INDEX idx_date (date),
  CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reservation_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
)
`;

/* ------------------------ NOTIFICATIONS ------------------------ */
const createTableNotifications = `
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  sent_at DATETIME NOT NULL,
  status VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_sent_at (sent_at),
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)
`;

/* -------------------- INVITATION REGISTRATION ------------------- */
const createTableInvitations = `
CREATE TABLE IF NOT EXISTS invitations_registration (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  token VARCHAR(255) NOT NULL UNIQUE,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

/* ------------------------- USER QUERIES ------------------------- */
const createNewUserQuery = `
INSERT INTO users (
  first_name,
  last_name,
  email,
  password,
  role_id,
  invitation_id,
  created_at
) VALUES (?, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmailQuery = `
SELECT * FROM users WHERE email = ?
`;

/* --------------------------- EXPORT ----------------------------- */
module.exports = {
  createDB,
  dropDB,
  createTableRoles,
  insertDefaultRoles,
  createTableUsers,
  createTableRooms,
  createTableReservations,
  createTableNotifications,
  createTableInvitations,
  createNewUserQuery,
  findUserByEmailQuery
};
