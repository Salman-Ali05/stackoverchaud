const express = require('express');
const router = express.Router();
const controller = require('../controller/reservation.controller');
const verifyToken = require('../middlewares/auth');

router.use(verifyToken);

router.get('/', controller.getAllReservations);
router.get('/:id', controller.getReservationById);
router.post('/', controller.createReservation);
router.put('/:id', controller.updateReservation);
router.delete('/:id', controller.deleteReservation);

module.exports = router;
