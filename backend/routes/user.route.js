/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */


const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const verifyToken = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roles');

router.post('/login', userController.login);
router.post('/', userController.createUser);

router.use(verifyToken);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', authorizeRoles("admin"), userController.deleteUser);

module.exports = router;
