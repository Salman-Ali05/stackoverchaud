/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestion des rôles utilisateurs
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupérer tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Liste des rôles
 */

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtenir un rôle par ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du rôle
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Créer un nouveau rôle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rôle créé
 *       403:
 *         description: Accès interdit (admin uniquement)
 */

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Modifier un rôle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 *       403:
 *         description: Accès interdit (admin uniquement)
 */

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Supprimer un rôle
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rôle supprimé
 *       403:
 *         description: Accès interdit (admin uniquement)
 */

const express = require('express');
const router = express.Router();
const controller = require('../controller/role.controller');
const verifyToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

// Public routes
router.get('/', controller.getAllRoles);
router.get('/:id', controller.getRoleById);

// Authenticated admin-only routes
router.use(verifyToken);

router.post('/', authorizeRoles('admin'), controller.createRole);
router.put('/:id', authorizeRoles('admin'), controller.updateRole);
router.delete('/:id', authorizeRoles('admin'), controller.deleteRole);

module.exports = router;
