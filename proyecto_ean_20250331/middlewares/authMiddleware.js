module.exports = {
    isAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Por favor inicia sesión para ver esta página');
      res.redirect('/login');
    },
  
    isAdmin: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
      }
      req.flash('error_msg', 'No tienes permisos para acceder a esta página');
      res.redirect('/');
    },

    isCliente: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'cliente') {
        return next();
      }
      req.flash('error_msg', 'Por favor inicia sesión como cliente');
      res.redirect('/login');
    }
  };

  