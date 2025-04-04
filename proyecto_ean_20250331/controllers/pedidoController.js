const Pedido = require('../models/Pedido');
const User = require('../models/User');
const Transportadora = require('../models/Transportadora');

exports.listPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.getAll();
    const transportadoras = await Transportadora.getAll();
    const clientes = await User.getAll(); // Obtener todos los usuarios
    
    
    const clientesFiltrados = clientes.filter(user => user.role === 'cliente');
    
    res.render('admin/pedidos', { 
      pedidos, 
      transportadoras,
      clientes: clientesFiltrados 
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al obtener pedidos');
    res.redirect('/admin/dashboard');
  }
};

exports.createPedido = async (req, res) => {
  try {
    const { producto, cliente_id, estado_pedido, transportadora_id, ruta, observaciones } = req.body;
    
    await Pedido.create({
      producto,
      cliente_id, // Ahora recibimos directamente el ID
      estado_pedido,
      transportadora_id: transportadora_id || null,
      ruta,
      observaciones
    });

    req.flash('success_msg', 'Pedido creado correctamente');
    res.redirect('/admin/pedidos');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al crear pedido');
    res.redirect('/admin/pedidos');
  }
};

exports.editPedidoForm = async (req, res) => {
  try {
    const pedido = await Pedido.getById(req.params.id);
    const transportadoras = await Transportadora.getAll();
    const clientes = await User.getAll();
    
    if (!pedido) {
      req.flash('error_msg', 'Pedido no encontrado');
      return res.redirect('/admin/pedidos');
    }
    
    res.render('admin/edit-pedido', { 
      pedido, 
      transportadoras,
      clientes,
      estados: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado']
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar el pedido');
    res.redirect('/admin/pedidos');
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const { producto, cliente_id, estado_pedido, transportadora_id, ruta, observaciones } = req.body;
    
    await Pedido.update(req.params.id, {
      producto,
      cliente_id,
      estado_pedido,
      transportadora_id: transportadora_id || null,
      ruta,
      observaciones
    });
    
    req.flash('success_msg', 'Pedido actualizado correctamente');
    res.redirect('/admin/pedidos');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al actualizar el pedido');
    res.redirect(`/admin/pedidos/editar/${req.params.id}`);
  }
};

exports.showPedido = async (req, res) => {
  try {
    const pedido = await Pedido.getById(req.params.id);
    
    if (!pedido) {
      req.flash('error_msg', 'Pedido no encontrado');
      return res.redirect('/admin/pedidos');
    }
    
    res.render('admin/detalles-pedido', { pedido });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar los detalles');
    res.redirect('/admin/pedidos');
  }
};
