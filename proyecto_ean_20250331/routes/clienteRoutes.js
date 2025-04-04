const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/mis-pedidos', 
  authMiddleware.isAuthenticated,
  clienteController.misPedidos
);

router.get('/mis-pedidos/:id', 
  authMiddleware.isAuthenticated,
  clienteController.verPedido
);

module.exports = router;