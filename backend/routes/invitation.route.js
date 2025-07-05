const express = require('express');
const router = express.Router();
const controller = require('../controller/invitation.controller');

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Gestion des invitations
 */

/**
 * @swagger
 * /invitations:
 *   post:
 *     summary: Créer une invitation
 *     tags: [Invitations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invitation créée
 *       400:
 *         description: Email requis
 */

/**
 * @swagger
 * /invitations/{token}:
 *   get:
 *     summary: Valider un token d'invitation
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invitation trouvée
 *       404:
 *         description: Token non trouvé
 *       410:
 *         description: Token déjà utilisé
 */

/**
 * @swagger
 * /invitations/{token}/use:
 *   patch:
 *     summary: Marquer une invitation comme utilisée
 *     tags: [Invitations]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token marqué comme utilisé
 */
router.post('/', controller.createInvitation);
router.get('/:token', controller.validateToken);
router.patch('/:token/use', controller.useToken);

module.exports = router;
