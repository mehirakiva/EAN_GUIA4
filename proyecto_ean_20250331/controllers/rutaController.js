const Ruta = require('../models/Ruta');

exports.listRutas = async (req, res) => {
  try {
    const rutas = await Ruta.getAll();
    res.render('admin/rutas', { rutas });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al obtener las rutas');
    res.redirect('/admin/dashboard');
  }
};

exports.createRuta = async (req, res) => {
  try {
    const { ruta_origen, ruta_descanso, ruta_destino, ruta_llegada } = req.body;
    
    await Ruta.create({
      ruta_origen,
      ruta_descanso: ruta_descanso || null,
      ruta_destino,
      ruta_llegada
    });
    
    req.flash('success_msg', 'Ruta creada correctamente');
    res.redirect('/admin/rutas');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al crear la ruta');
    res.redirect('/admin/rutas');
  }
};

exports.editRutaForm = async (req, res) => {
  try {
    const ruta = await Ruta.getById(req.params.id);
    if (!ruta) {
      req.flash('error_msg', 'Ruta no encontrada');
      return res.redirect('/admin/rutas');
    }
    
  
    ruta.ruta_llegada_formatted = ruta.ruta_llegada.substring(0, 5);
    
    res.render('admin/edit-ruta', { ruta });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar la ruta');
    res.redirect('/admin/rutas');
  }
};

exports.updateRuta = async (req, res) => {
  try {
    const { ruta_origen, ruta_descanso, ruta_destino, ruta_llegada } = req.body;
    
    await Ruta.update(req.params.id, {
      ruta_origen,
      ruta_descanso: ruta_descanso || null,
      ruta_destino,
      ruta_llegada
    });
    
    req.flash('success_msg', 'Ruta actualizada correctamente');
    res.redirect('/admin/rutas');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al actualizar la ruta');
    res.redirect(`/admin/rutas/editar/${req.params.id}`);
  }
};

exports.deleteRuta = async (req, res) => {
  try {
    await Ruta.delete(req.params.id);
    req.flash('success_msg', 'Ruta eliminada correctamente');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al eliminar la ruta');
  }
  res.redirect('/admin/rutas');
};

