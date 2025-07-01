const Student = require('../models/Student');
const emailService = require('../utils/emailService');
const { validationResult } = require('express-validator');

class StudentController {
    static async register(req, res) {
        try {
            // Vérification des erreurs de validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: 'Données invalides',
                    details: errors.array()
                });
            }

            const { nom, prenoms, date_naissance, email, filiere_id } = req.body;

            // Vérifier si l'email existe déjà
            const existingStudent = await Student.findByEmail(email);
            if (existingStudent) {
                return res.status(400).json({
                    error: 'Un étudiant avec cet e-mail existe déjà'
                });
            }

            // Créer l'étudiant
            const photo_url = req.file ? `/uploads/photos/${req.file.filename}` : null;
            
            const student = await Student.create({
                nom,
                prenoms,
                date_naissance,
                email,
                filiere_id,
                photo_url
            });

            // Envoyer l'email de confirmation
            await emailService.sendConfirmationEmail(student);

            res.status(201).json({
                success: true,
                message: 'Inscription réussie',
                student: {
                    id: student.id,
                    numero_etudiant: student.numero_etudiant,
                    nom: student.nom,
                    prenoms: student.prenoms
                }
            });

        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            res.status(500).json({
                error: 'Erreur interne du serveur'
            });
        }
    }

    static async getAll(req, res) {
        try {
            const filters = req.query;
            const students = await Student.getAll(filters);
            
            res.json({
                success: true,
                data: students,
                count: students.length
            });
        } catch (error) {
            console.error('Erreur lors de la récupération:', error);
            res.status(500).json({
                error: 'Erreur interne du serveur'
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const student = await Student.findById(id);
            
            if (!student) {
                return res.status(404).json({
                    error: 'Étudiant non trouvé'
                });
            }

            res.json({
                success: true,
                data: student
            });
        } catch (error) {
            console.error('Erreur lors de la récupération:', error);
            res.status(500).json({
                error: 'Erreur interne du serveur'
            });
        }
    }
}

module.exports = StudentController;