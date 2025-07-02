const express = require('express');
const app = express();

// Routes
const userRoutes = require('./routes/user.route');
const notificationRoutes = require('./routes/notification.route');
const reservationRoutes = require('./routes/reservation.route');
const roomRoutes = require('./routes/room.route');

// Swagger
const { swaggerUi, swaggerSpec } = require('./docs/swagger');

// Middlewares
app.use(express.json());

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

module.exports = app;
