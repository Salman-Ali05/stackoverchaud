const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

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
