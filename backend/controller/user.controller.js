const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// const Role = require('../models/role.model');
// const Invitation = require('../models/invitation.model');
const { JWT_SECRET_KEY } = require('../utils/secrets');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role, invitation } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: hashedPassword,
      role : role || null,
      invitation: invitation || null
    });

    const savedUser = await user.save();
    res.status(201).json({ status: 'success', message: 'User created', data: savedUser });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email }).populate('role');

    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ status: 'error', message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, role: user.role.name }, JWT_SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.name
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().populate('role').populate('invitation');
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role').populate('invitation');
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, password, role, invitation } = req.body;

  if (!firstName || !lastName || !email || !role) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    user.firstName = firstName.trim();
    user.lastName = lastName.trim();
    user.email = email.trim();
    user.role = role;
    user.invitation = invitation || null;

    if (password) {
      user.password = await bcrypt.hash(password.trim(), 10);
    }

    const updatedUser = await user.save();
    res.status(200).json({ status: 'success', message: 'User updated', data: updatedUser });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};