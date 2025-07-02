const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');

app.use(express.json());
app.use('/api/users', userRoutes);

module.exports = app;
