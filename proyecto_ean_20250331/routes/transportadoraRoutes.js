const express = require('express');
const router = express.Router();
const transportadoraController = require('../controllers/transportadoraController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/transportadoras', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  transportadoraController.listTransportadoras
);

router.post('/transportadoras', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  transportadoraController.createTransportadora
);

// Nuevas rutas para editar y eliminar
router.get('/transportadoras/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  transportadoraController.editTransportadoraForm
);

router.post('/transportadoras/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  transportadoraController.updateTransportadora
);

router.get('/transportadoras/eliminar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  transportadoraController.deleteTransportadora
);



module.exports = router;