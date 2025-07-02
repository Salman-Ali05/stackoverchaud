const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');
const notificationRoutes = require('./routes/notification.route');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
module.exports = app;
