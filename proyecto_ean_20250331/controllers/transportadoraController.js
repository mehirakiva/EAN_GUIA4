const Transportadora = require('../models/Transportadora');

exports.listTransportadoras = async (req, res) => {
  try {
    const transportadoras = await Transportadora.getAll();
    res.render('admin/transportadoras', { transportadoras });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al obtener transportadoras');
    res.redirect('/admin/dashboard');
  }
};

exports.createTransportadora = async (req, res) => {
  try {
    const { nombre_transportadora } = req.body;
    
    // Validación más estricta
    if (!nombre_transportadora || typeof nombre_transportadora !== 'string' || nombre_transportadora.trim() === '') {
      req.flash('error_msg', 'El nombre de la transportadora es requerido');
      return res.redirect('/admin/transportadoras');
    }

    const nombre = nombre_transportadora.trim();
    
    
    if (nombre.length < 3) {
      req.flash('error_msg', 'El nombre debe tener al menos 3 caracteres');
      return res.redirect('/admin/transportadoras');
    }

    await Transportadora.create({
      nombre_transportadora: nombre
    });

    req.flash('success_msg', 'Transportadora creada correctamente');
    res.redirect('/admin/transportadoras');
  } catch (error) {
    console.error('Error al crear transportadora:', error);
    
    let errorMsg = 'Error al crear la transportadora';
    if (error.code === 'ER_BAD_NULL_ERROR') {
      errorMsg = 'El nombre de la transportadora no puede estar vacío';
    }
    
    req.flash('error_msg', errorMsg);
    res.redirect('/admin/transportadoras');
  }
};

exports.editTransportadoraForm = async (req, res) => {
  try {
    const transportadora = await Transportadora.getById(req.params.id);
    if (!transportadora) {
      req.flash('error_msg', 'Transportadora no encontrada');
      return res.redirect('/admin/transportadoras');
    }
    
    res.render('admin/edit-transportadora', { transportadora });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar la transportadora');
    res.redirect('/admin/transportadoras');
  }
};

exports.updateTransportadora = async (req, res) => {
  try {
    const { nombre_transportadora } = req.body;
    
    if (!nombre_transportadora || nombre_transportadora.trim() === '') {
      req.flash('error_msg', 'El nombre no puede estar vacío');
      return res.redirect(`/admin/transportadoras/editar/${req.params.id}`);
    }

    const updated = await Transportadora.update(req.params.id, { 
      nombre_transportadora: nombre_transportadora.trim() 
    });

    if (!updated) {
      req.flash('error_msg', 'No se pudo actualizar la transportadora');
      return res.redirect(`/admin/transportadoras/editar/${req.params.id}`);
    }

    req.flash('success_msg', 'Transportadora actualizada correctamente');
    res.redirect('/admin/transportadoras');
  } catch (error) {
    console.error('Error al actualizar transportadora:', error);
    req.flash('error_msg', 'Error al actualizar la transportadora');
    res.redirect(`/admin/transportadoras/editar/${req.params.id}`);
  }
};

exports.deleteTransportadora = async (req, res) => {
  try {
    const deleted = await Transportadora.delete(req.params.id);
    
    if (!deleted) {
      req.flash('error_msg', 'No se pudo eliminar la transportadora');
      return res.redirect('/admin/transportadoras');
    }
    
    req.flash('success_msg', 'Transportadora eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar transportadora:', {
      message: error.message,
      stack: error.stack,
      sql: error.sql
    });
    
    if (error.message.includes('pedidos asociados')) {
      req.flash('error_msg', 'No se puede eliminar: existen pedidos asociados');
    } else {
      req.flash('error_msg', 'Error al eliminar la transportadora');
    }
  }
  res.redirect('/admin/transportadoras');
};

