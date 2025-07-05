const Invitation = require('../models/invitation.model');
const { v4: uuidv4 } = require('uuid');

exports.createInvitation = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status: 'error', message: 'Email is required' });
    }

    const token = uuidv4();
    const invitation = { email, token };

    Invitation.create(invitation, (err, result) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }

        res.status(201).json({
            status: 'success',
            message: 'Invitation created',
            data: { email, token }
        });
    });
};

exports.validateToken = (req, res) => {
    const { token } = req.params;

    Invitation.findByToken(token, (err, invitation) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        if (!invitation) return res.status(404).json({ status: 'error', message: 'Token not found' });
        if (invitation.used) return res.status(410).json({ status: 'error', message: 'Token already used' });

        res.status(200).json({ status: 'success', data: invitation });
    });
};

exports.useToken = (req, res) => {
    const { token } = req.params;

    Invitation.markAsUsed(token, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });

        res.status(200).json({ status: 'success', message: 'Token marked as used' });
    });
};
