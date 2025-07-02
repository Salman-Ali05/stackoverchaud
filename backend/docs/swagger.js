// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StackOverChaud API',
      version: '1.0.0',
      description: 'Documentation de l\'API de gestion des utilisateurs, réservations, salles et notifications'
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Serveur local'
      }
    ]
  },
  apis: ['./routes/*.js'] // Fichiers contenant les commentaires Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
