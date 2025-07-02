const User = require('../models/user.model');
const db = require('../config/db.config.init');
const bcrypt = require('bcryptjs');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, role, invitationToken, structureId } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields'
    });
  }

  const hashedPassword = bcrypt.hashSync(password.trim(), 10);

  const newUser = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    password: hashedPassword,
    role,
    invitationToken: invitationToken || null,
    structureId: structureId || null
  };

  User.create(newUser, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result
    });
  });
};

exports.getUserByEmail = (req, res) => {
  const { email } = req.params;

  User.findByEmail(email.trim(), (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  });
};

exports.getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.status(200).json({ status: 'success', data: results });
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    if (results.length === 0) return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({ status: 'success', data: results[0] });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;

  const query = `
    UPDATE users 
    SET firstName = ?, lastName = ?, email = ?, role = ?
    WHERE id = ?
  `;

  db.query(query, [firstName, lastName, email, role, id], (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });

    res.status(200).json({ status: 'success', message: 'User updated successfully' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });

    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required'
    });
  }

  User.findByEmail(email.trim(), (err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message
      });
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const isMatch = bcrypt.compareSync(password.trim(), user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid password'
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        role: user.role
      }
    });
  });
};
