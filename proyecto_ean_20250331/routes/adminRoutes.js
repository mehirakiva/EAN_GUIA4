const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.dashboard);
router.get('/users', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.listUsers);
router.get('/users/edit/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.editUserForm);
router.post('/users/edit/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.updateUser);
router.get('/users/delete/:id', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.deleteUser);


router.get('/users/edit/:id', 
    authMiddleware.isAuthenticated, 
    authMiddleware.isAdmin, 
    adminController.editUserForm
  );
  
  router.post('/users/edit/:id', 
    authMiddleware.isAuthenticated, 
    authMiddleware.isAdmin, 
    adminController.updateUser
  );
  
  router.get('/users/delete/:id', 
    authMiddleware.isAuthenticated, 
    authMiddleware.isAdmin, 
    adminController.deleteUser
  );

  router.get('/users/new', 
    authMiddleware.isAuthenticated, 
    authMiddleware.isAdmin, 
    adminController.newUserForm
  );
  
  router.post('/users', 
    authMiddleware.isAuthenticated, 
    authMiddleware.isAdmin, 
    adminController.createUser
  );

  
module.exports = router;