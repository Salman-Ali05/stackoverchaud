const Room = require('../models/room.model');

exports.createRoom = (req, res) => {
  Room.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(201).json({ status: 'success', message: 'Room created', data: result });
  });
};

exports.getAllRooms = (req, res) => {
  Room.findAll((err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', data: results });
  });
};

exports.getRoomById = (req, res) => {
  Room.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    if (!results.length) return res.status(404).json({ status: 'error', message: 'Room not found' });
    res.status(200).json({ status: 'success', data: results[0] });
  });
};

exports.updateRoom = (req, res) => {
  Room.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', message: 'Room updated' });
  });
};

exports.deleteRoom = (req, res) => {
  Room.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', message: 'Room deleted' });
  });
};
 