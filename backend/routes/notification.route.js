const express = require('express');
const router = express.Router();
const notifController = require('../controller/notification.controller');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Gestion des notifications
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Créer une nouvelle notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               content:
 *                 type: string
 *               sent_at:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification créée avec succès
 */
router.post('/', notifController.createNotification);

/**
 * @swagger
 * /notifications:
 *   get:
 *     summary: Récupérer toutes les notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des notifications
 */
router.get('/', notifController.getNotifications);

/**
 * @swagger
 * /notifications/user/{userId}:
 *   get:
 *     summary: Récupérer les notifications d’un utilisateur
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Notifications de l’utilisateur
 */
router.get('/user/:userId', notifController.getNotificationsByUser);

/**
 * @swagger
 * /notifications/{id}:
 *   delete:
 *     summary: Supprimer une notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la notification
 *     responses:
 *       200:
 *         description: Notification supprimée
 */
router.delete('/:id', notifController.deleteNotification);

module.exports = router;
