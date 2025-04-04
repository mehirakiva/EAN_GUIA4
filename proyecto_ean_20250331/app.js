const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const colors = require('colors');

// Inicializaciones
const app = express();
require('./config/passport');

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev')); // aca podemos realizar analsis de code http
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Middleware de variables globales
app.use((req, res, next) => {
  res.locals.user = req.user || null;  // Asegura que user siempre exista
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Agrega esto antes de las rutas
app.locals.formatDate = (dateString) => {
  if (!dateString) return '--';
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-CO', options);
};

// Rutas
app.use(require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/admin', require('./routes/transportadoraRoutes'));
app.use('/admin', require('./routes/pedidoRoutes'));
app.use('/admin', require('./routes/rutaRoutes'));
app.use('/admin', require('./routes/estadoEnvioRoutes'));
app.use('/', require('./routes/clienteRoutes'));

// Ruta principal
app.get('/', (req, res) => {
  res.render('home');
});

// Archivos estáticos como css y asi
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log('===================================='.green);
  console.log(`Servidor en puerto ${app.get('port')}`.red);
  console.log('-------------------------------------'.green);
  console.log('UNIVERSDAD EAN');
  console.log(`https://localhost:${app.get('port')}`.blue);
});