const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');
const notificationRoutes = require('./routes/notification.route');
const reservationRoutes = require('./routes/reservation.route');
const roomRoutes = require('./routes/room.route');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
module.exports = app;
