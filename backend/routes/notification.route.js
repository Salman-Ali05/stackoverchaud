const express = require('express');
const router = express.Router();
const notifController = require('../controller/notification.controller');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);

router.post('/', notifController.createNotification);
router.get('/', notifController.getNotifications);
router.get('/user/:userId', notifController.getNotificationsByUser);
router.delete('/:id', notifController.deleteNotification);

module.exports = router;
