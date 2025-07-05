const express = require('express');
const app = express();

const userRoutes = require('./routes/user.route');
// const notificationRoutes = require('./routes/notification.route');
// const reservationRoutes = require('./routes/reservation.route');
// const roomRoutes = require('./routes/room.route');
const roleRoutes = require('./routes/role.route');
// const invitationRoutes = require('./routes/invitation.route');
const { swaggerUi, swaggerSpec } = require('./docs/swagger');

// Middleware JSON
app.use(express.json());

// Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/users', userRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/reservations', reservationRoutes);
app.use('/api/roles', roleRoutes);
// app.use('/api/invitations', invitationRoutes);

module.exports = app;
