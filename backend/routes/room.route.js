const express = require('express');
const router = express.Router();
const controller = require('../controller/room.controller');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Gestion des salles
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Récupérer toutes les salles
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des salles
 */
router.get('/', controller.getAllRooms);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Récupérer une salle par ID
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la salle
 *     responses:
 *       200:
 *         description: Données de la salle
 *       404:
 *         description: Salle non trouvée
 */
router.get('/:id', controller.getRoomById);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Créer une nouvelle salle
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               type:
 *                 type: string
 *               accessible_to_students:
 *                 type: boolean
 *               floor_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Salle créée avec succès
 */
router.post('/', controller.createRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Mettre à jour une salle existante
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la salle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               type:
 *                 type: string
 *               accessible_to_students:
 *                 type: boolean
 *               floor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Salle mise à jour avec succès
 *       404:
 *         description: Salle non trouvée
 */
router.put('/:id', controller.updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Supprimer une salle
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la salle
 *     responses:
 *       200:
 *         description: Salle supprimée avec succès
 *       404:
 *         description: Salle non trouvée
 */
router.delete('/:id', controller.deleteRoom);

module.exports = router;
