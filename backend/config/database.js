const mysql = require('mysql2/promise');

// Configuration de la base de données
const dbConfig = {
    host: 'localhost',
    user: 'root',          // Votre utilisateur MySQL
    password: 'admin',          // Votre mot de passe MySQL (vide si pas de mot de passe)
    database: 'inscription_etudiants',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Créer le pool de connexions
const pool = mysql.createPool(dbConfig);

// Tester la connexion
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connexion MySQL réussie !');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Erreur connexion MySQL:', error.message);
        return false;
    }
}

// Exporter le pool
module.exports = {
    pool,
    testConnection
};