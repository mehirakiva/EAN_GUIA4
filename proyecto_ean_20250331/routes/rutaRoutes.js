const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/rutas', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  rutaController.listRutas
);

router.post('/rutas', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  rutaController.createRuta
);


router.get('/rutas/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  rutaController.editRutaForm
);

router.post('/rutas/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  rutaController.updateRuta
);

router.get('/rutas/eliminar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  rutaController.deleteRuta
);

module.exports = router;