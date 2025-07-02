const { DB_NAME } = require('../utils/secrets');

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;
const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  invitation_token VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

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

const createNewUserQuery = `
INSERT INTO users (
  first_name,
  last_name,
  email,
  password,
  role,
  invitation_token,
  created_at
) VALUES (?, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmailQuery = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
  createDB,
  dropDB,
  createTableUsers,
  createTableRooms,
  createTableReservations,
  createTableNotifications,
  createNewUserQuery,
  findUserByEmailQuery
};
