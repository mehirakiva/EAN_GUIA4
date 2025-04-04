const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/pedidos', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  pedidoController.listPedidos
);

router.post('/pedidos', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  pedidoController.createPedido
);


router.get('/pedidos/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  pedidoController.editPedidoForm
);

router.post('/pedidos/editar/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  pedidoController.updatePedido
);

router.get('/pedidos/detalles/:id', 
  authMiddleware.isAuthenticated, 
  authMiddleware.isAdmin, 
  pedidoController.showPedido
);

// Añade más rutas según necesites

module.exports = router;