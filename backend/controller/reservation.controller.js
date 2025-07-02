const Reservation = require('../models/reservation.model');

exports.createReservation = (req, res) => {
  Reservation.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(201).json({ status: 'success', message: 'Reservation created', data: result });
  });
};

exports.getAllReservations = (req, res) => {
  Reservation.findAll((err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', data: results });
  });
};

exports.getReservationById = (req, res) => {
  Reservation.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    if (!results.length) return res.status(404).json({ status: 'error', message: 'Reservation not found' });
    res.status(200).json({ status: 'success', data: results[0] });
  });
};

exports.updateReservation = (req, res) => {
  Reservation.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', message: 'Reservation updated' });
  });
};

exports.deleteReservation = (req, res) => {
  Reservation.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', message: 'Reservation deleted' });
  });
};
