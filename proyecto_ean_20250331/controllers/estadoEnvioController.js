const EstadoEnvio = require('../models/EstadoEnvio');
const Pedido = require('../models/Pedido');
const Transportadora = require('../models/Transportadora');

exports.listEstadoEnvios = async (req, res) => {
  try {
    const estadosEnvio = await EstadoEnvio.getAll();
    res.render('admin/estado-envio', { estadosEnvio });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al obtener los estados de envío');
    res.redirect('/admin/dashboard');
  }
};

exports.createEstadoEnvioForm = async (req, res) => {
  try {
    const pedidos = await Pedido.getAll();
    const transportadoras = await Transportadora.getAll();
    
    res.render('admin/nuevo-estado-envio', { 
      pedidos,
      transportadoras,
      estados: ['preparacion', 'transito', 'entregado', 'cancelado']
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar el formulario');
    res.redirect('/admin/estado-envio');
  }
};

exports.createEstadoEnvio = async (req, res) => {
  try {
    const { id_pedido, transportadora_id, estado, observaciones } = req.body;
    
    // Validaciones básicas
    if (!id_pedido || !transportadora_id || !estado) {
      req.flash('error_msg', 'Campos requeridos faltantes');
      return res.redirect('/admin/estado-envio/nuevo');
    }

    // Obtener cliente_id del pedido
    const pedido = await Pedido.getById(id_pedido);
    if (!pedido) {
      req.flash('error_msg', 'Pedido no encontrado');
      return res.redirect('/admin/estado-envio/nuevo');
    }

    await EstadoEnvio.create({
      id_pedido,
      transportadora_id,
      cliente_id: pedido.cliente_id,
      estado,
      observaciones: observaciones || null
    });

    req.flash('success_msg', 'Estado de envío creado correctamente');
    res.redirect('/admin/estado-envio');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al crear el estado de envío');
    res.redirect('/admin/estado-envio/nuevo');
  }
};

exports.editEstadoEnvioForm = async (req, res) => {
  try {
    const estadoEnvio = await EstadoEnvio.getById(req.params.id);
    const transportadoras = await Transportadora.getAll();
    
    if (!estadoEnvio) {
      req.flash('error_msg', 'Estado de envío no encontrado');
      return res.redirect('/admin/estado-envio');
    }
    
    res.render('admin/edit-estado-envio', {
      estadoEnvio,
      transportadoras,
      estados: ['preparacion', 'transito', 'entregado', 'cancelado']
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar el formulario de edición');
    res.redirect('/admin/estado-envio');
  }
};

exports.updateEstadoEnvio = async (req, res) => {
  try {
    const { id } = req.params;
    const { transportadora_id, estado, observaciones } = req.body;
    
    // Validaciones básicas
    if (!transportadora_id || !estado) {
      req.flash('error_msg', 'Transportadora y estado son requeridos');
      return res.redirect(`/admin/estado-envio/editar/${id}`);
    }
    
    await EstadoEnvio.update(id, {
      transportadora_id,
      estado,
      observaciones: observaciones || null
    });
    
    req.flash('success_msg', 'Estado de envío actualizado correctamente');
    res.redirect('/admin/estado-envio');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al actualizar el estado de envío');
    res.redirect(`/admin/estado-envio/editar/${req.params.id}`);
  }
};