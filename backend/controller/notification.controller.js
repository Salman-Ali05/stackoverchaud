const Notification = require('../models/notification.model');

exports.createNotification = (req, res) => {
  const { user_id, content, sent_at, status, type } = req.body;

  if (!user_id || !content || !sent_at || !status || !type) {
    return res.status(400).json({ status: 'error', message: 'Missing fields' });
  }

  const newNotif = { user_id, content, sent_at, status, type };
  Notification.create(newNotif, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(201).json({ status: 'success', message: 'Notification created', data: result });
  });
};

exports.getNotifications = (req, res) => {
  Notification.getAll((err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', data: result });
  });
};

exports.getNotificationsByUser = (req, res) => {
  const { userId } = req.params;
  Notification.getByUserId(userId, (err, result) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', data: result });
  });
};

exports.deleteNotification = (req, res) => {
  const { id } = req.params;
  Notification.delete(id, (err) => {
    if (err) return res.status(500).json({ status: 'error', message: err.message });
    res.status(200).json({ status: 'success', message: 'Notification deleted' });
  });
};