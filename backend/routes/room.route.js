const express = require('express');
const router = express.Router();
const controller = require('../controller/room.controller');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);

router.get('/', controller.getAllRooms);
router.get('/:id', controller.getRoomById);
router.post('/', controller.createRoom);
router.put('/:id', controller.updateRoom);
router.delete('/:id', controller.deleteRoom);

module.exports = router;
 