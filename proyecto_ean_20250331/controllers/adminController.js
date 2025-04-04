const User = require('../models/User');

exports.dashboard = (req, res) => {
  res.render('admin/dashboard', { user: req.user });
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.render('admin/users', { users });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al obtener los usuarios');
    res.redirect('/admin/dashboard');
  }
};

exports.editUserForm = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      req.flash('error_msg', 'Usuario no encontrado');
      return res.redirect('/admin/users');
    }
    
    res.render('admin/edit-user', { 
      user,
      roles: ['admin', 'cliente'] // Opciones de roles
    });
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al cargar el usuario');
    res.redirect('/admin/users');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    await User.update(req.params.id, { name, email, role });
    
    req.flash('success_msg', 'Usuario actualizado correctamente');
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al actualizar el usuario');
    res.redirect(`/admin/users/edit/${req.params.id}`);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Evitar que el admin se elimine a sí mismo
    if (req.user.id == req.params.id) {
      req.flash('error_msg', 'No puedes eliminar tu propio usuario');
      return res.redirect('/admin/users');
    }
    
    await User.delete(req.params.id);
    req.flash('success_msg', 'Usuario eliminado correctamente');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al eliminar el usuario');
  }
  res.redirect('/admin/users');
};


exports.newUserForm = (req, res) => {
  res.render('admin/new-user', { 
    roles: ['admin', 'cliente'] // Lista de roles disponibles
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, confirm_password, role } = req.body;
  const errors = [];

  // Validaciones básicas
  if (!name || !email || !password || !confirm_password || !role) {
    errors.push({ text: 'Todos los campos son obligatorios' });
  }

  if (password !== confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden' });
  }

  if (password.length < 6) {
    errors.push({ text: 'La contraseña debe tener al menos 6 caracteres' });
  }

  if (errors.length > 0) {
    return res.render('admin/new-user', { 
      errors,
      name,
      email,
      roles: ['admin', 'cliente'],
      selectedRole: role
    });
  }

  try {
    // Verificar si el email ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      req.flash('error_msg', 'El correo ya está registrado');
      return res.redirect('/admin/users/new');
    }

    // Crear usuario
    await User.create({ name, email, password, role });
    
    req.flash('success_msg', `Usuario ${email} creado correctamente`);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al crear el usuario');
    res.redirect('/admin/users/new');
  }
};

exports.newUserForm = (req, res) => {
  res.render('admin/new-user', { 
    errors: [], 
    name: '',
    email: '',
    roles: ['admin', 'cliente'],
    selectedRole: ''
  });
};