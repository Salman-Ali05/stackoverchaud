const Role = require('../models/role.model');

exports.getAllRoles = (req, res) => {
    Role.getAll((err, roles) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.status(200).json({ status: 'success', data: roles });
    });
};

exports.getRoleById = (req, res) => {
    Role.getById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        if (result.length === 0) return res.status(404).json({ status: 'error', message: 'Role not found' });
        res.status(200).json({ status: 'success', data: result[0] });
    });
};

exports.createRole = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ status: 'error', message: 'Role name is required' });

    Role.create(name, (err, result) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.status(201).json({ status: 'success', message: 'Role created', data: { id: result.insertId, name } });
    });
};

exports.updateRole = (req, res) => {
    const { name } = req.body;
    Role.update(req.params.id, name, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.status(200).json({ status: 'success', message: 'Role updated' });
    });
};

exports.deleteRole = (req, res) => {
    Role.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ status: 'error', message: err.message });
        res.status(200).json({ status: 'success', message: 'Role deleted' });
    });
};
