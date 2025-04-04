const Pedido = require('../models/Pedido');
const EstadoEnvio = require('../models/EstadoEnvio');

exports.misPedidos = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'cliente') {
      req.flash('error_msg', 'Acceso no autorizado');
      return res.redirect('/');
    }

    const pedidos = await Pedido.getByClienteId(req.user.id);
    res.render('cliente/mis-pedidos', { 
      pedidos,
      user: req.user
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar tus pedidos');
    res.redirect('/');
  }
};

exports.verPedido = async (req, res) => {
  try {
    const pedido = await Pedido.getById(req.params.id);
    
    // Verificar que el pedido pertenezca al cliente
    if (!pedido || pedido.cliente_id !== req.user.id) {
      req.flash('error_msg', 'Pedido no encontrado o no autorizado');
      return res.redirect('/mis-pedidos');
    }

    const historialEstado = await EstadoEnvio.getByPedidoId(req.params.id);
    
    res.render('cliente/ver-pedido', {
      pedido,
      historialEstado,
      user: req.user
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar el pedido');
    res.redirect('/mis-pedidos');
  }
};