const express = require('express');
const router = express.Router();
const estadoEnvioController = require('../controllers/estadoEnvioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/estado-envio', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  estadoEnvioController.listEstadoEnvios
);

router.get('/estado-envio/nuevo', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  estadoEnvioController.createEstadoEnvioForm
);

router.post('/estado-envio', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  estadoEnvioController.createEstadoEnvio
);

router.get('/estado-envio/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  estadoEnvioController.editEstadoEnvioForm
);

router.post('/estado-envio/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  estadoEnvioController.updateEstadoEnvio
);

module.exports = router;