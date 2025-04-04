const User = require('../models/User');
const passport = require('passport');

exports.loginForm = (req, res) => {
  const error = req.flash('error');
  const error_msg = req.flash('error_msg');
  const allErrors = [...error, ...error_msg].filter(msg => msg && msg.trim() !== '');
  
  res.render('auth/login', { 
    errors: allErrors,
    hasErrors: allErrors.length > 0,
    user: req.user || null  
  });
};

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logout = (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error(err);
      req.flash('error_msg', 'Error al cerrar sesión');
      return res.redirect('/');
    }
    req.flash('success_msg', 'Has cerrado sesión correctamente');
    res.redirect('/login');
  });
};

exports.registerForm = (req, res) => {
  res.render('auth/register', { 
    errors: [], 
    name: '', 
    email: '' 
  });
};

exports.register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  if (!name || !email || !password || !confirm_password) {
    errors.push({ text: 'Todos los campos son obligatorios' });
  }

  if (password !== confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden' });
  }

  if (password.length < 6) {
    errors.push({ text: 'La contraseña debe tener al menos 6 caracteres' });
  }

  if (errors.length > 0) {
    return res.render('auth/register', { 
      errors, 
      name, 
      email 
    });
  }

  try {
    const user = await User.findByEmail(email);
    if (user) {
      req.flash('error_msg', 'El correo ya está registrado');
      return res.redirect('/register');
    }

    await User.create({ name, email, password });
    req.flash('success_msg', 'Registro exitoso. Por favor inicia sesión');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Error al registrar el usuario');
    res.redirect('/register');
  }
};